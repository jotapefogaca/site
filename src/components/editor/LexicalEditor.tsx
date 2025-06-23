"use client";

import { useEffect, useState } from "react";

import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { $generateNodesFromDOM } from '@lexical/html';
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { $getRoot, $insertNodes } from "lexical";
import {
  SharedHistoryContext,
  useSharedHistoryContext,
} from "./context/SharedHistoryContext";
import { SharedAutocompleteContext } from "./context/SharedAutocompleteContext";
import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme";

// editor

import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import KeywordsPlugin from "./plugins/KeywordsPlugin";
import { KeywordNode } from "./nodes/KeywordNode";
import TabFocusPlugin from "./plugins/TabFocusPlugin";
import LexicalAutoLinkPlugin from "./plugins/AutoLinkPlugin";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";
import { useLexicalEditable } from "@lexical/react/useLexicalEditable";
import CodeActionMenuPlugin from "./plugins/CodeActionMenuPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import ModalProvider from "./hooks/useModal";
import DragDropPaste from "./plugins/DragDropPastePlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";

import ImagesPlugin from "./plugins/ImagesPlugin";
import { ImageNode } from "./nodes/ImageNode";
import ExcalidrawPlugin from "./plugins/ExcalidrawPlugin";
import { ExcalidrawNode } from "./nodes/ExcalidrawNode";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import TableCellResizerPlugin from "./plugins/TableCellResizer";
import TableHoverActionsPlugin from "./plugins/TableHoverActionsPlugin";
import { LayoutContainerNode } from "./nodes/LayoutContainerNode";
import { LayoutItemNode } from "./nodes/LayoutItemNode";
import { LayoutPlugin } from "./plugins/LayoutPlugin/LayoutPlugin";
import AutocompletePlugin from "./plugins/AutocompletePlugin";
import { AutocompleteNode } from "./nodes/AutocompleteNode";
import TableOfContentsPlugin from "./plugins/TableOfContentsPlugin";
import { CollapsibleContainerNode } from "./plugins/CollapsiblePlugin/CollapsibleContainerNode";
import { CollapsibleContentNode } from "./plugins/CollapsiblePlugin/CollapsibleContentNode";
import { CollapsibleTitleNode } from "./plugins/CollapsiblePlugin/CollapsibleTitleNode";
import CollapsiblePlugin from "./plugins/CollapsiblePlugin";
import { $generateHtmlFromNodes } from '@lexical/html';

import dynamic from "next/dynamic";
import { EditorState } from "lexical";
import { Button } from "../ui/button";
import { OnChangePlugin } from "./plugins/OnChangePlugin";
import { Loader2 } from "lucide-react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
const ToolbarPlugin = dynamic(() => import("./plugins/ToolbarPlugin"), {
  ssr: false,
});
const FloatingLinkEditorPlugin = dynamic(
  () => import("./plugins/FloatingLinkEditorPlugin"),
  { ssr: false }
);
const TableCellActionMenuPlugin = dynamic(
  () => import("./plugins/TableActionMenuPlugin"),
  { ssr: false }
);
const FloatingTextFormatToolbarPlugin = dynamic(
  () => import("./plugins/FloatingTextFormatToolbarPlugin"),
  { ssr: false }
);
const ComponentPickerMenuPlugin = dynamic(
  () => import("./plugins/ComponentPickerPlugin"),
  { ssr: false }
);
const PlaygroundNodes = [
  HeadingNode,
  QuoteNode,
  CodeNode,
  ListNode,
  ListItemNode,
  LinkNode,
  HorizontalRuleNode,
  CodeHighlightNode,
  AutoLinkNode,
  HorizontalRuleNode,
  KeywordNode,
  ImageNode,
  ExcalidrawNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  LayoutContainerNode,
  LayoutItemNode,
  AutocompleteNode,
  CollapsibleContainerNode,
  CollapsibleContentNode,
  CollapsibleTitleNode,
];

export default function LexicalEditor({
  initialEditorState,
  SavelocalStorage = true,
  loadFromLocalStorge,
  contentEditable
}: {
  initialEditorState?: any;
  SavelocalStorage: boolean
  loadFromLocalStorge?: boolean,
  contentEditable?: string
}) {

  function Load() {
    if (typeof window !== "undefined" && loadFromLocalStorge) {
      const data = localStorage.getItem("editorState");
      return data;
    } else {
      return initialEditorState;
    }
  }

  const initialConfig = {
    namespace: "Editor",
    nodes: [...PlaygroundNodes],
    editable: true,
    editorState: Load(),
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  function MyOnChangePlugin({ onChange, loading }: any) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      if (contentEditable && editor && loading) {
        console.log(contentEditable)
        editor.update(() => {
          // Cria o DOM a partir do HTML
          const parser = new DOMParser();
          const dom = parser.parseFromString(contentEditable, "text/html");

          // Converte o DOM em nós do Lexical
          const lexicalNodes = $generateNodesFromDOM(editor, dom);

          // Limpa e insere os novos nós no root do editor
          const root = $getRoot();
          root.clear();
          $insertNodes(lexicalNodes);

          setIsLoading(false)
        });
      } else {
        editor.update(() => {
          // Gera HTML a partir dos nós do editor
          const html = $generateHtmlFromNodes(editor, null);
          console.log(html)
          // Define o conteúdo como Markdown (ou o que você quiser fazer com ele)
          setNodesToMarkdown(html);
        });
      }
    }, [contentEditable, editor])

    // Listener para mudanças no editor (onChange)
    useEffect(() => {
      return editor.registerUpdateListener(({ editorState }) => {
        onChange(editorState);
      });
    }, [editor, onChange]);

    return null;
  }

  function onChange(editorState: any) {
    const editorStateJSON = editorState.toJSON();
    setEditorState(JSON.stringify(editorStateJSON));
  }

  const [editorState, setEditorState] = useState<string>();
  const [nodesToMarkdown, setNodesToMarkdown] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <SharedAutocompleteContext>
          <ModalProvider>
            <Editor SavelocalStorage={SavelocalStorage} value={nodesToMarkdown} />
          </ModalProvider>
        </SharedAutocompleteContext>
      </SharedHistoryContext>
      <MyOnChangePlugin onChange={onChange} loading={isLoading} />
    </LexicalComposer>
  );
}



const placeholder =
  "Digite sua publicação aqui...";

function Editor({ SavelocalStorage, value }: { SavelocalStorage: boolean, value: string }) {
  const isEditable = useLexicalEditable();
  const { historyState } = useSharedHistoryContext();
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);
  const [editorState, setEditorState] = useState<EditorState>();
  const [Loading, setLoading] = useState(false)

  function Save() {
    // save it database
  }

  function onChange(editorState: EditorState) {
    setLoading(true)
    if (SavelocalStorage) {
      const json = JSON.stringify(editorState);
      localStorage.setItem('editorState', json)
    } else {
      setEditorState(editorState);
    }
    setLoading(false)

  }

  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className="w-full min-h-screen h-full">
      <input
        type="text"
        name='descricao'
        value={value}
        hidden
      />
      {isEditable && <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />}
      <div className=" relative">
        <HistoryPlugin externalHistoryState={historyState} />
        <RichTextPlugin
          contentEditable={
            <div ref={onRef} className="mt-2 overflow-x-hidden">
              <ContentEditable autoFocus={true} className="editor-input p-4" />
            </div>
          }
          placeholder={<div className="editor-placeholder">{placeholder}</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
      <OnChangePlugin onChange={onChange} />
      <DragDropPaste />
      <TabFocusPlugin />
      <TabIndentationPlugin />
      <LexicalAutoLinkPlugin />
      <ClickableLinkPlugin disabled={isEditable} />
      <AutoFocusPlugin />
      <ListPlugin />
      <LinkPlugin />
      <HorizontalRulePlugin />
      <ImagesPlugin />
      <ExcalidrawPlugin />
      <LayoutPlugin />
      <AutocompletePlugin />
      <CheckListPlugin />
      <ClearEditorPlugin />
      <ListMaxIndentLevelPlugin maxDepth={7} />
      <CodeHighlightPlugin />
      <MarkdownShortcutPlugin />
      <KeywordsPlugin />
      <TablePlugin />

      {isEditable && <ComponentPickerMenuPlugin />}
      <TableCellResizerPlugin />
      <TableHoverActionsPlugin />
      <CollapsiblePlugin />
      {isEditable && floatingAnchorElem && (
        <>
          <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
          <FloatingLinkEditorPlugin
            anchorElem={floatingAnchorElem}
            isLinkEditMode={isLinkEditMode}
            setIsLinkEditMode={setIsLinkEditMode}
          />
          <TableCellActionMenuPlugin
            anchorElem={floatingAnchorElem}
            cellMerge={true}
          />
          <FloatingTextFormatToolbarPlugin
            anchorElem={floatingAnchorElem}
            setIsLinkEditMode={setIsLinkEditMode}
          />
        </>
      )}
      <TableOfContentsPlugin />
    </div>
  );
}

