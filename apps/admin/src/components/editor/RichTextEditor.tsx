"use client";

import { useCallback, useRef, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table/kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
  List,
  ListOrdered,
  Quote,
  Minus,
  Link as LinkIcon,
  ImagePlus,
  Upload,
  Table as TableIcon,
  Columns,
  Rows,
  Trash2,
  Undo2,
  Redo2,
} from "lucide-react";

function ToolbarButton({
  active,
  title,
  onClick,
  children,
}: {
  active?: boolean;
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-muted ${
        active ? "bg-primary/10 text-primary" : "text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-5 w-px shrink-0 bg-border" aria-hidden />;
}

function Toolbar({ editor }: { editor: Editor }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL del enlace", previousUrl ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImageByUrl = useCallback(() => {
    const url = window.prompt("URL de la imagen");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const handleFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          editor.chain().focus().setImage({ src: reader.result, alt: file.name }).run();
        }
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    },
    [editor],
  );

  const insideTable = editor.isActive("table");

  return (
    <div className="flex shrink-0 flex-wrap items-center gap-1 border-b border-border bg-muted/40 p-1.5">
      <ToolbarButton title="Párrafo" active={editor.isActive("paragraph")} onClick={() => editor.chain().focus().setParagraph().run()}>
        <Pilcrow className="h-4 w-4" aria-hidden />
      </ToolbarButton>
      <ToolbarButton
        title="Título 1"
        active={editor.isActive("heading", { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 className="h-4 w-4" aria-hidden />
      </ToolbarButton>
      <ToolbarButton
        title="Título 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="h-4 w-4" aria-hidden />
      </ToolbarButton>
      <ToolbarButton
        title="Título 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="h-4 w-4" aria-hidden />
      </ToolbarButton>

      <Divider />

      <ToolbarButton title="Negrita" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold className="h-4 w-4" aria-hidden />
      </ToolbarButton>
      <ToolbarButton title="Cursiva" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic className="h-4 w-4" aria-hidden />
      </ToolbarButton>
      <ToolbarButton
        title="Subrayado"
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon className="h-4 w-4" aria-hidden />
      </ToolbarButton>
      <ToolbarButton title="Tachado" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough className="h-4 w-4" aria-hidden />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        title="Lista con viñetas"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" aria-hidden />
      </ToolbarButton>
      <ToolbarButton
        title="Lista numerada"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" aria-hidden />
      </ToolbarButton>
      <ToolbarButton title="Cita" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote className="h-4 w-4" aria-hidden />
      </ToolbarButton>
      <ToolbarButton title="Línea divisoria" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus className="h-4 w-4" aria-hidden />
      </ToolbarButton>

      <Divider />

      <ToolbarButton title="Enlace" active={editor.isActive("link")} onClick={setLink}>
        <LinkIcon className="h-4 w-4" aria-hidden />
      </ToolbarButton>
      <ToolbarButton title="Insertar imagen por URL" onClick={addImageByUrl}>
        <ImagePlus className="h-4 w-4" aria-hidden />
      </ToolbarButton>
      <ToolbarButton title="Subir imagen desde el equipo" onClick={() => fileInputRef.current?.click()}>
        <Upload className="h-4 w-4" aria-hidden />
      </ToolbarButton>
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

      <ToolbarButton
        title="Insertar tabla"
        active={insideTable}
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
      >
        <TableIcon className="h-4 w-4" aria-hidden />
      </ToolbarButton>

      {insideTable && (
        <>
          <ToolbarButton title="Agregar columna" onClick={() => editor.chain().focus().addColumnAfter().run()}>
            <Columns className="h-4 w-4" aria-hidden />
          </ToolbarButton>
          <ToolbarButton title="Agregar fila" onClick={() => editor.chain().focus().addRowAfter().run()}>
            <Rows className="h-4 w-4" aria-hidden />
          </ToolbarButton>
          <ToolbarButton title="Eliminar tabla" onClick={() => editor.chain().focus().deleteTable().run()}>
            <Trash2 className="h-4 w-4" aria-hidden />
          </ToolbarButton>
        </>
      )}

      <Divider />

      <ToolbarButton title="Deshacer" onClick={() => editor.chain().focus().undo().run()}>
        <Undo2 className="h-4 w-4" aria-hidden />
      </ToolbarButton>
      <ToolbarButton title="Rehacer" onClick={() => editor.chain().focus().redo().run()}>
        <Redo2 className="h-4 w-4" aria-hidden />
      </ToolbarButton>
    </div>
  );
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = "Escribí el contenido completo. Usá la barra superior para títulos, imágenes y tablas.",
  className = "",
}: {
  content?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const [, forceUpdate] = useState(0);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Image.configure({ inline: false, allowBase64: true, HTMLAttributes: { class: "rounded-md" } }),
      TableKit.configure({ table: { resizable: true } }),
      Placeholder.configure({ placeholder }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    onSelectionUpdate: () => forceUpdate((n) => n + 1),
    onTransaction: () => forceUpdate((n) => n + 1),
    editorProps: {
      attributes: {
        class: "prose-editor min-h-[200px] max-w-none px-4 py-3 text-sm outline-none",
      },
    },
  });

  if (!editor) {
    return <div className={`min-h-[280px] rounded-md border border-border bg-background ${className}`} />;
  }

  return (
    <div className={`flex min-h-0 flex-col overflow-hidden rounded-md border border-border bg-background ${className}`}>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="min-h-0 flex-1 overflow-y-auto" />
    </div>
  );
}
