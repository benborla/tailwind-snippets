'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow as gruvbox } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  onChange: (value: string) => void;
  initialValue?: string;
  className?: string;
}

export default function CodeEditor({ onChange, initialValue = '', className }: CodeEditorProps) {
  const [code, setCode] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCode(value);
    onChange(value);
  };

  return (
    <div className={cn('relative rounded-md border', className)}>
      <Textarea
        value={code}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="font-mono min-h-[200px] resize-y"
        placeholder="<button class='px-4 py-2 bg-blue-500 text-white rounded-md'>Click me</button>"
      />
      {!isFocused && code && (
        <div className="absolute inset-0 pointer-events-none">
          <SyntaxHighlighter
            language="html"
            style={gruvbox}
            customStyle={{
              margin: 0,
              padding: '0.75rem',
              background: 'transparent',
              minHeight: '200px',
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}
