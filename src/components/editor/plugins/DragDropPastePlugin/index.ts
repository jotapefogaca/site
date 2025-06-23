

import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {DRAG_DROP_PASTE} from '@lexical/rich-text';
import {isMimeType, mediaFileReader} from '@lexical/utils';
import {COMMAND_PRIORITY_LOW} from 'lexical';
import {useEffect} from 'react';

import {INSERT_IMAGE_COMMAND} from '../ImagesPlugin';

const ACCEPTABLE_IMAGE_TYPES = [
  'image/',
  'image/heic',
  'image/heif',
  'image/gif',
  'image/webp',
];

export default function DragDropPaste(): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      DRAG_DROP_PASTE,
      (files) => {
        (async () => {
          console.log(files);
        })();
        return true;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor]);
  return null;
}