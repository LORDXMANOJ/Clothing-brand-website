import React, { useState } from 'react';
import { Send } from 'lucide-react';

export const ChatWindow = ({ messages, onSendMessage, currentUser }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text);
    setText('');
  };

  return (
    <div className="bg-white border border-gray-300 rounded flex flex-col h-[500px]">
      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-center text-xs text-gray-500 my-auto">
            No negotiation messages yet. Start the conversation to discuss meetup or exchange details!
          </p>
        ) : (
          messages.map((msg) => {
            const isMe =
              msg.sender?._id === currentUser?._id ||
              msg.sender === currentUser?._id ||
              msg.sender?.name === currentUser?.name;

            return (
              <div
                key={msg._id || Math.random()}
                className={`flex flex-col max-w-[80%] ${isMe ? 'ml-auto items-end' : 'mr-auto items-start'}`}
              >
                <div className="flex items-center space-x-1.5 mb-0.5">
                  <span className="text-[10px] font-bold text-gray-600">{msg.sender?.name || 'User'}</span>
                  <span className="text-[9px] text-gray-400">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </span>
                </div>
                <div
                  className={`p-2.5 rounded text-xs border ${
                    isMe
                      ? 'bg-gray-900 text-white border-gray-900 rounded-br-none'
                      : 'bg-white text-gray-900 border-gray-300 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input box */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-300 bg-white flex items-center space-x-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message regarding shipping, sizing, or meetup location..."
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-gray-500"
        />
        <button
          type="submit"
          className="bg-gray-900 text-white px-4 py-2 rounded text-xs font-semibold hover:bg-gray-800 flex items-center space-x-1"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};
