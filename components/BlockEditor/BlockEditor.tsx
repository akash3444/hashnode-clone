"use client";

import { EditorContent, UseEditorOptions } from "@tiptap/react";
import { useMemo, useRef } from "react";

import { LinkMenu } from "@/components/BlockEditor/menus";

import { useBlockEditor } from "@/hooks/useBlockEditor";

import "./styles/index.css";

import { EditorContext } from "@/context/EditorContext";
import ImageBlockMenu from "@/components/BlockEditor/extensions/ImageBlock/components/ImageBlockMenu";
import { ColumnsMenu } from "@/components/BlockEditor/extensions/MultiColumn/menus";
import {
  TableColumnMenu,
  TableRowMenu,
} from "@/components/BlockEditor/extensions/Table/menus";
import { ContentItemMenu } from "./menus/ContentItemMenu";
import { TextMenu } from "./menus/TextMenu";
import { TiptapProps } from "./types";

export const BlockEditor = ({
  ydoc,
  editorOptions,
}: TiptapProps & { editorOptions?: UseEditorOptions }) => {
  const menuContainerRef = useRef(null);

  const { editor } = useBlockEditor({ ydoc, editorOptions });

  const providerValue = useMemo(() => {
    return {};
  }, []);

  if (!editor) {
    return null;
  }

  return (
    <EditorContext.Provider value={providerValue}>
      <div className="flex h-full" ref={menuContainerRef}>
        <div className="relative flex flex-col flex-1 h-full">
          <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
          <ContentItemMenu editor={editor} />
          <LinkMenu editor={editor} appendTo={menuContainerRef} />
          <TextMenu editor={editor} />
          <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
          <TableRowMenu editor={editor} appendTo={menuContainerRef} />
          <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
          <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
        </div>
      </div>
    </EditorContext.Provider>
  );
};

export default BlockEditor;
