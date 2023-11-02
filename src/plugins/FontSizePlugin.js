import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelectionStyleValueForProperty,
  $patchStyleText
} from "@lexical/selection";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND
} from "lexical";
import { useCallback, useEffect, useState } from "react";

export default function FontSizePlugin() {
  const [editor] = useLexicalComposerContext();

  const [selectionFontSize, setSelectionFontSize] = useState("");

  // const $updateSelectionFontSize = useCallback(() => {
  //   const selection = $getSelection();
  //   if (!$isRangeSelection(selection)) {
  //     return;
  //   }
  //   console.log(selection);
  //   const fontSize = $getSelectionStyleValueForProperty(
  //     selection,
  //     "font-size",
  //     "32px"
  //   );
  //   setSelectionFontSize(fontSize);
  // }, [editor]);

  // useEffect(() => {
  //   // Update when selection changes
  //   return editor.registerCommand(
  //     SELECTION_CHANGE_COMMAND,
  //     () => {
  //       $updateSelectionFontSize();
  //       return false;
  //     },
  //     COMMAND_PRIORITY_CRITICAL
  //   );
  // }, [editor, $updateSelectionFontSize]);

  // useEffect(() => {
  //   // Update when edits are made
  //   return editor.registerUpdateListener(({ editorState }) => {
  //     editorState.read(() => $updateSelectionFontSize());
  //   });
  // }, [editor, $updateSelectionFontSize]);

  return (
    <div>
      <span>Current selection font size: {selectionFontSize}</span>
      <button onClick={() => handleFontSizeChange("24px")}>
        Change to 24px
      </button>
      <button onClick={() => handleFontSizeChange("48px")}>
        Change to 48px
      </button>
    </div>
  );

  function handleFontSizeChange(size) {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, {
          "font-size": size
        });
      }
    });
  }
}
