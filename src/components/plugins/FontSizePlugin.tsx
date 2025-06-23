import React from "react";
import { $getSelection, $isRangeSelection } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export const FontSizePlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();

  const changeFontSize = (size: any) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.formatText(size);
      }
    });
  };

  return (
    <div>
      <button onClick={() => changeFontSize("12px")}>12px</button>
      <button onClick={() => changeFontSize("16px")}>16px</button>
      <button onClick={() => changeFontSize("20px")}>20px</button>
    </div>
  );
};
