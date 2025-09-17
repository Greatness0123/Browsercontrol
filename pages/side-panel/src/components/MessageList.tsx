import type { Message } from '@extension/storage';
import { ACTOR_PROFILES } from '../types/message';
import { memo } from 'react';

interface MessageListProps {
  messages: Message[];
  isDarkMode?: boolean;
}

export default memo(function MessageList({ messages, isDarkMode = false }: MessageListProps) {
  return (
    <div className="max-w-full space-y-4">
      {messages.map((message, index) => (
        <MessageBlock
          key={`${message.actor}-${message.timestamp}-${index}`}
          message={message}
          isSameActor={index > 0 ? messages[index - 1].actor === message.actor : false}
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  );
});

interface MessageBlockProps {
  message: Message;
  isSameActor: boolean;
  isDarkMode?: boolean;
}

function MessageBlock({ message, isSameActor, isDarkMode = false }: MessageBlockProps) {
  if (!message.actor) {
    console.error('No actor found');
    return <div />;
  }
  const actor = ACTOR_PROFILES[message.actor as keyof typeof ACTOR_PROFILES];
  const isProgress = message.content === 'Showing progress...';
  const isUser = message.actor === 'user';

  return (
    <div
      className={`flex max-w-full gap-3 ${
        !isSameActor
          ? `mt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pt-4 first:mt-0 first:border-t-0 first:pt-0`
          : ''
      }`}>
      
      {/* REMOVED: All icon containers */}

      <div className="min-w-0 flex-1">
        {/* Show actor name only for non-user actors and when actor changes */}
        {!isSameActor && !isUser && (
          <div className={`mb-1 text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
            {getDisplayName(actor.name)}
          </div>
        )}

        <div className="space-y-0.5">
          <div className={`whitespace-pre-wrap break-words text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            {isProgress ? (
              <div className={`h-1 overflow-hidden rounded ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}>
                <div className={`animate-progress h-full ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'}`} />
              </div>
            ) : (
              message.content
            )}
          </div>
          {!isProgress && (
            <div className={`text-right text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              {formatTimestamp(message.timestamp)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Formats actor names for better display
 */
function getDisplayName(actorName: string): string {
  const nameMap: Record<string, string> = {
    'Planner': 'Planning',
    'Navigator': 'Navigating', 
    'Validator': 'Validating',
    'System': 'System',
    'Manager': 'Managing',
    'Evaluator': 'Evaluating'
  };
  
  return nameMap[actorName] || actorName;
}

/**
 * Formats a timestamp (in milliseconds) to a readable time string
 */
function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();
  const isThisYear = date.getFullYear() === now.getFullYear();

  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (isToday) return timeStr;
  if (isYesterday) return `Yesterday, ${timeStr}`;
  if (isThisYear) return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })}, ${timeStr}`;

  return `${date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })}, ${timeStr}`;
}