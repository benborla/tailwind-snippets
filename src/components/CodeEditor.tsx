'use client';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useState, useEffect } from 'react';
import { registerCodeHighlighting } from '@lexical/code';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { $getRoot } from 'lexical';

// @INFO: Gruvbox theme colors
const theme = {
  ltr: 'text-left',
  rtl: 'text-right',
  paragraph: 'mb-0',
  placeholder: 'text-[#928374]',
  code: 'relative font-mono bg-[#282828]',
  text: {
    base: 'text-[#ebdbb2]',
    comment: 'text-[#928374]',
    keyword: 'text-[#fb4934]',
    string: 'text-[#b8bb26]',
    number: 'text-[#d3869b]',
    variable: 'text-[#83a598]',
    function: 'text-[#8ec07c]',
    operator: 'text-[#fe8019]',
    tag: 'text-[#fb4934]',
    attr: 'text-[#fabd2f]',
  },
};

function LineNumbers({ code }: { code: string }) {
  const lines = code.split('\n').length;
  return (
    <div className="w-12 py-3 text-right font-mono text-sm text-[#928374] select-none border-r border-[#3c3836]">
      {Array.from({ length: Math.max(lines, 1) }, (_, i) => (
        <div key={i + 1} className="px-2">
          {i + 1}
        </div>
      ))}
    </div>
  );
}

function CodeEditorPlugin({ initialValue }: { initialValue: string }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (initialValue) {
      editor.update(() => {
        const root = $getRoot();
        const codeNode = $createCodeNode('html');
        root.append(codeNode);
        const textNode = $createCodeHighlightNode(initialValue);
        codeNode.append(textNode);
      });
    }
    // Register syntax highlighting
    return registerCodeHighlighting(editor);
  }, [editor, initialValue]);

  return null;
}

interface CodeEditorProps {
  onChange?: (text: string) => void;
  initialValue?: string;
}

export default function CodeEditor({ onChange, initialValue = '' }: CodeEditorProps) {
  const [code, setCode] = useState(initialValue);

  const initialConfig = {
    namespace: 'TailwindSnippetEditor',
    theme,
    onError: (error: Error) => {
      console.error('Lexical Editor Error:', error);
    },
    editable: true,
    nodes: [CodeNode, CodeHighlightNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative min-h-[200px] rounded-md border border-[#3c3836] bg-[#282828]">
        <div className="flex">
          <LineNumbers code={code} />
          <div className="flex-1 overflow-auto">
            <PlainTextPlugin
              contentEditable={
                <ContentEditable 
                  className="min-h-[200px] w-full resize-none px-4 py-3 font-mono text-sm outline-none text-[#ebdbb2] bg-transparent"
                />
              }
              placeholder={
                <div className="pointer-events-none absolute top-3 left-16 text-sm text-[#928374]">
                  Enter your Tailwind CSS code here...
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>
        </div>
        <HistoryPlugin />
        <CodeEditorPlugin initialValue={initialValue} />
        <OnChangePlugin
          onChange={text => {
            setCode(text);
            onChange?.(text);
          }}
        />
      </div>
    </LexicalComposer>
  );
}

function OnChangePlugin({ onChange }: { onChange: (text: string) => void }) {
  const [editor] = useLexicalComposerContext();
  editor.registerUpdateListener(({ editorState }) => {
    editorState.read(() => {
      const root = $getRoot();
      const textContent = root.getTextContent();
      onChange(textContent);
    });
  });
  return null;
}
