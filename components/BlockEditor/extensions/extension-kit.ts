"use client";

import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import {
  BlockquoteFigure,
  CharacterCount,
  Column,
  Columns,
  Document,
  Dropcursor,
  Emoji,
  Figcaption,
  // FileHandler,
  Focus,
  // FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalRule,
  ImageBlock,
  Link,
  Placeholder,
  Selection,
  SlashCommand,
  StarterKit,
  Subscript,
  Superscript,
  Table,
  TableOfContents,
  TableCell,
  TableHeader,
  TableRow,
  TaskItem,
  TaskList,
  TextAlign,
  TextStyle,
  TrailingNode,
  Typography,
  emojiSuggestion,
  Markdown,
} from ".";
import { ImageUpload } from "./ImageUpload";

interface ExtensionKitProps {
  // provider?: HocuspocusProvider | null;
  userId?: string;
  userName?: string;
  userColor?: string;
}

const lowlight = createLowlight(common);

export const ExtensionKit = ({
  // provider,
  userId,
  userName = "Maxi",
}: ExtensionKitProps) => [
  Document,
  Columns,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Column,
  Selection,
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
  }),
  HorizontalRule,
  StarterKit.configure({
    document: false,
    dropcursor: false,
    heading: false,
    horizontalRule: false,
    blockquote: false,
    history: false,
    codeBlock: false,
  }),
  CodeBlockLowlight.configure({
    lowlight,
    defaultLanguage: null,
  }),
  TextStyle,
  FontSize,
  // FontFamily,
  TrailingNode,
  Link.configure({
    openOnClick: false,
  }),
  Highlight.configure({ multicolor: true }),
  CharacterCount.configure({ limit: 50000 }),
  TableOfContents,
  // TODO: Handle image upload
  ImageUpload.configure({
    // clientId: provider?.document?.clientID,
  }),
  ImageBlock,
  // FileHandler.configure({
  //   allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
  //   onDrop: (currentEditor, files, pos) => {
  //     files.forEach(async () => {
  //       const url = await API.uploadImage()

  //       currentEditor.chain().setImageBlockAt({ pos, src: url }).focus().run()
  //     })
  //   },
  //   onPaste: (currentEditor, files) => {
  //     files.forEach(async () => {
  //       const url = await API.uploadImage()

  //       return currentEditor
  //         .chain()
  //         .setImageBlockAt({ pos: currentEditor.state.selection.anchor, src: url })
  //         .focus()
  //         .run()
  //     })
  //   },
  // }),
  Markdown,
  Emoji.configure({
    enableEmoticons: true,
    suggestion: emojiSuggestion,
  }),
  TextAlign.extend({
    addKeyboardShortcuts() {
      return {};
    },
  }).configure({
    types: ["heading", "paragraph"],
  }),
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Typography,
  Placeholder.configure({
    includeChildren: false,
    showOnlyCurrent: true,
    placeholder: () => "",
  }),
  SlashCommand,
  Focus,
  Figcaption,
  BlockquoteFigure,
  Dropcursor.configure({
    width: 2,
    class: "ProseMirror-dropcursor border-black",
  }),
];

export default ExtensionKit;
