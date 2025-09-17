import { useState, useRef, useEffect, useCallback } from 'react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onStopTask: () => void;
  disabled: boolean;
  showStopButton: boolean;
  setContent?: (setter: (text: string) => void) => void;
  isDarkMode?: boolean;
}

export default function ChatInput({
  onSendMessage,
  onStopTask,
  disabled,
  showStopButton,
  setContent,
  isDarkMode = false,
}: ChatInputProps) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle text changes and resize textarea
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);

    // Resize textarea
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  // Expose a method to set content from outside
  useEffect(() => {
    if (setContent) {
      setContent(setText);
    }
  }, [setContent]);

  // Initial resize when component mounts
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = '30px'; 
    }
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (text.trim()) {
        onSendMessage(text);
        setText('');
        // Reset textarea height after sending
        if (textareaRef.current) {
          textareaRef.current.style.height = '30px';
        }
      }
    },
    [text, onSendMessage],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    },
    [handleSubmit],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={`input-bar-container overflow-hidden rounded-lg border transition-colors ${isDarkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white'}`}
      aria-label="Chat input form">
      <div className="flex flex-col">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
          className={`w-full resize-none border-none p-3 focus:outline-none ${
            disabled
              ? isDarkMode
                ? 'bg-gray-800 text-gray-400'
                : 'bg-gray-100 text-gray-500'
              : isDarkMode
                ? 'bg-gray-800 text-white placeholder-gray-400'
                : 'bg-white text-black placeholder-gray-500'
          }`}
          placeholder=""
          aria-label="Message input"
          style={{
            minHeight: '40px',
            maxHeight: '120px',
            lineHeight: '1.5',
          }}
        />

        <div
          className={`flex items-center justify-between px-3 py-2 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
          <div className="flex gap-2 text-gray-500">{/* Icons can go here */}</div>

          {showStopButton ? (
            <button
              type="button"
              onClick={onStopTask}
              className="send-button stop-button rounded-full bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
              aria-label="Stop generating">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="1" />
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              disabled={disabled || !text.trim()}
              className={`send-button rounded-full px-4 py-2 transition-colors ${
                disabled || !text.trim()
                  ? isDarkMode
                    ? 'bg-gray-600 text-gray-400'
                    : 'bg-gray-300 text-gray-500'
                  : isDarkMode
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-black text-white hover:bg-gray-800'
              }`}
              aria-label="Send message">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </form>
  );
}