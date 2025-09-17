/* eslint-disable react/prop-types */
import { FaTrash } from 'react-icons/fa';

interface ChatSession {
  id: string;
  title: string;
  createdAt: number;
}

interface ChatHistoryListProps {
  sessions: ChatSession[];
  onSessionSelect: (sessionId: string) => void;
  onSessionDelete: (sessionId: string) => void;
  visible: boolean;
  isDarkMode?: boolean;
}

const ChatHistoryList: React.FC<ChatHistoryListProps> = ({
  sessions,
  onSessionSelect,
  onSessionDelete,
  visible,
  isDarkMode = false,
}) => {
  if (!visible) return null;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="h-full overflow-y-auto p-4">
      <h2 className={`mb-4 text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Chat History</h2>
      {sessions.length === 0 ? (
        <div
          className={`rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'} p-4 text-center`}>
          No chat history available
        </div>
      ) : (
        <div className="space-y-2">
          {sessions.map(session => (
            <div
              key={session.id}
              className={`group relative rounded-lg border ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-800 hover:bg-gray-700' 
                  : 'border-gray-300 bg-white hover:bg-gray-50'
              } p-3 transition-all cursor-pointer`}>
              <button 
                onClick={() => onSessionSelect(session.id)} 
                className="w-full text-left" 
                type="button"
              >
                <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  {session.title}
                </h3>
                <p className={`mt-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {formatDate(session.createdAt)}
                </p>
              </button>
              <button
                onClick={e => {
                  e.stopPropagation();
                  onSessionDelete(session.id);
                }}
                className={`absolute right-2 top-2 rounded-full p-1.5 opacity-0 transition-all group-hover:opacity-100 ${
                  isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                    : 'bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-700'
                }`}
                aria-label="Delete session"
                type="button">
                <FaTrash size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatHistoryList;