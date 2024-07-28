"use client";

import { debounce } from "@/lib/utils";
import { EditorEvents } from "@tiptap/react";
import "iframe-resizer/js/iframeResizer.contentWindow";
import { useCallback, useMemo, useState } from "react";
import { Doc as YDoc } from "yjs";
import { BlockEditor } from "../BlockEditor";

const DraftEditor = ({
  title,
  content,
}: {
  title: string;
  content?: string;
}) => {
  const [draftTitle, setDraftTitle] = useState(title);

  const ydoc = useMemo(() => new YDoc(), []);

  const onUpdate = useCallback(({ editor }: EditorEvents["update"]) => {
    console.log("MARKDOWN", editor.storage.markdown.getMarkdown());
  }, []);

  const onUpdateDebounced = debounce(onUpdate, 1000);

  return (
    <>
      <input
        className="mt-10 mb-8 w-full max-w-2xl mx-auto block text-4xl text-[2.5rem] font-bold focus:outline-none placeholder:text-slate-500"
        placeholder="Article Title..."
        value={draftTitle}
        onChange={(e) => setDraftTitle(e.target.value)}
      />
      <BlockEditor
        hasCollab={false}
        ydoc={ydoc}
        editorOptions={{
          onUpdate: onUpdateDebounced,
          content,
        }}
      />
    </>
  );
};

export default DraftEditor;
