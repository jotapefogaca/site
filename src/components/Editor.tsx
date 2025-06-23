import React, { useCallback, useEffect, useState } from "react";

import ExampleTheme from "./themes/ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateNodesFromDOM } from '@lexical/html';
import { $getRoot, $insertNodes } from "lexical";
import { $generateHtmlFromNodes } from '@lexical/html';
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
} from "lexical";
import { FontSizePlugin } from "./plugins/FontSizePlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";

type Props = {
  htmlString?: string,
  type: 'Editor' | 'Html'
}

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig = {
  namespace: "MyEditor",
  theme: ExampleTheme,
  onError(error: any) {
    throw error;
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

const Editor = ({ type, htmlString }: Props) => {
  const [stringHtml, setStringHtml] = useState<string>()

  function MyOnChangePlugin({ onChange }: any) {
    const [editor] = useLexicalComposerContext();

    if (type === 'Html' && htmlString) {
      editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(htmlString, "text/html");
        const lexicalNodes = $generateNodesFromDOM(editor, dom);
        const root = $getRoot();
        root.clear();
        $insertNodes(lexicalNodes);
      });
    }

    if (type === 'Editor') {
      if (typeof window !== 'undefined') {
        editor.update(() => {
          const html = $generateHtmlFromNodes(editor, null);
          setStringHtml(html);
        });
      }
    }

    useEffect(() => {
      return editor.registerUpdateListener(({ editorState }) => {
        onChange(editorState);
      });
    }, [editor, onChange]);

    return null;
  }

  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  const [editorState, setEditorState] = useState<string>();

  function onChange(editorState: any) {
    const editorStateJSON = editorState.toJSON();
    setEditorState(JSON.stringify(editorStateJSON));
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <input type="text" value={stringHtml} name='descricao' hidden />
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <div className="editor-scroller">
                <div className="editor" ref={onRef}>
                  <ContentEditable className="editor-input" onChange={onChange} />
                </div>
              </div>
            }
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
      </div>
      <HistoryPlugin />
      <MyOnChangePlugin onChange={onChange} />
    </LexicalComposer>
  );
};

export default Editor;
