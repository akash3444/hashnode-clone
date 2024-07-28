import { Editor, useEditor, UseEditorOptions } from "@tiptap/react";
import type { Doc as YDoc } from "yjs";

import { ExtensionKit } from "@/components/BlockEditor/extensions/extension-kit";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = ({
  editorOptions,
  ydoc,
}: {
  editorOptions?: UseEditorOptions;
  ydoc: YDoc;
}) => {
  const editor = useEditor(
    {
      ...editorOptions,
      autofocus: true,
      extensions: [...ExtensionKit({})],
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          class: "min-h-full",
        },
      },
    },
    [ydoc]
  );

  const characterCount = editor?.storage.characterCount || {
    characters: () => 0,
    words: () => 0,
  };

  if (typeof window !== "undefined") window.editor = editor;

  return { editor, characterCount };
};
