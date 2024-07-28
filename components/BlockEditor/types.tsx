import type { Doc as YDoc } from "yjs";

export interface TiptapProps {
  hasCollab: boolean;
  ydoc: YDoc;
}

export type EditorUser = {
  clientId: string;
  name: string;
  color: string;
  initials?: string;
};
