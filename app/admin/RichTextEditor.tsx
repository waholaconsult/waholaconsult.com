"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div style={{ border: "1px solid var(--border-color)", borderRadius: "8px", overflow: "hidden" }}>
      <div style={{ display: "flex", gap: "8px", padding: "10px", borderBottom: "1px solid var(--border-color)", backgroundColor: "rgba(0,0,0,0.2)", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          style={{ padding: "6px 12px", borderRadius: "4px", backgroundColor: editor.isActive('bold') ? "var(--bg-orange)" : "transparent", color: editor.isActive('bold') ? "#fff" : "var(--text-primary)" }}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          style={{ padding: "6px 12px", borderRadius: "4px", backgroundColor: editor.isActive('italic') ? "var(--bg-orange)" : "transparent", color: editor.isActive('italic') ? "#fff" : "var(--text-primary)", fontStyle: "italic" }}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          style={{ padding: "6px 12px", borderRadius: "4px", backgroundColor: editor.isActive('heading', { level: 2 }) ? "var(--bg-orange)" : "transparent", color: editor.isActive('heading', { level: 2 }) ? "#fff" : "var(--text-primary)", fontWeight: "bold" }}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          style={{ padding: "6px 12px", borderRadius: "4px", backgroundColor: editor.isActive('heading', { level: 3 }) ? "var(--bg-orange)" : "transparent", color: editor.isActive('heading', { level: 3 }) ? "#fff" : "var(--text-primary)", fontWeight: "bold" }}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          style={{ padding: "6px 12px", borderRadius: "4px", backgroundColor: editor.isActive('bulletList') ? "var(--bg-orange)" : "transparent", color: editor.isActive('bulletList') ? "#fff" : "var(--text-primary)" }}
        >
          Bullet List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          style={{ padding: "6px 12px", borderRadius: "4px", backgroundColor: editor.isActive('orderedList') ? "var(--bg-orange)" : "transparent", color: editor.isActive('orderedList') ? "#fff" : "var(--text-primary)" }}
        >
          Numbered List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          style={{ padding: "6px 12px", borderRadius: "4px", backgroundColor: editor.isActive('blockquote') ? "var(--bg-orange)" : "transparent", color: editor.isActive('blockquote') ? "#fff" : "var(--text-primary)" }}
        >
          Quote
        </button>
      </div>
      <div style={{ padding: "20px", minHeight: "300px", backgroundColor: "transparent" }}>
        <EditorContent editor={editor} className="tiptap-editor" />
      </div>
    </div>
  );
}
