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
  // The editor theme
  theme: ExampleTheme,
  // Handling of errors during update
  onError(error: any) {
    throw error;
  },
  // Any custom nodes go here
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


const ViewHtml = ({ type, htmlString }: Props) => {

  const [stringHtml, setStringHtml] = useState<string>()

  function MyOnChangePlugin({ onChange }: any) {
    // Access the editor through the LexicalComposerContext
    const [editor] = useLexicalComposerContext();

    if (type == 'Html' && htmlString) {
      editor.update(() => {
        //Importando HTML
        const parser = new DOMParser();
        const dom = parser.parseFromString(htmlString, "text/html");
        const lexicalNodes = $generateNodesFromDOM(editor, dom);
        const root = $getRoot();
        root.clear(); // Limpa o conteúdo existente se necessário
        $insertNodes(lexicalNodes);
      });
    }

    if (type == 'Editor') {
      editor.update(() => {
        setStringHtml($generateHtmlFromNodes(editor, null));
      });
    }



    // Wrap our listener in useEffect to handle the teardown and avoid stale references.
    useEffect(() => {
      // most listeners return a teardown function that can be called to clean them up.
      return editor.registerUpdateListener(({ editorState }) => {
        // call onChange here to pass the latest state up to the parent.
        onChange(editorState);
      });
    }, [editor, onChange]);

    return null;
  }

  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const teste = `{"root":{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"font-size: 19px;","text":"Ola! teste!","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  const [editorState, setEditorState] = useState<string>();

  function onChange(editorState: any) {
    // Call toJSON on the EditorState object, which produces a serialization safe string
    const editorStateJSON = editorState.toJSON();
    // However, we still have a JavaScript object, so we need to convert it to an actual string with JSON.stringify
    setEditorState(JSON.stringify(editorStateJSON));
  }

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <RichTextPlugin
        contentEditable={
          <div className="editor-scroller">
            <div className="editor" ref={onRef}>
              <ContentEditable className="editor-input" onChange={(e) => console.log(e)} />
            </div>
          </div>
        }
        placeholder={<Placeholder />}
        ErrorBoundary={LexicalErrorBoundary}

      />
      <MyOnChangePlugin onChange={onChange} />
    </LexicalComposer>
  );
};

export default ViewHtml;