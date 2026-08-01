import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { swapService } from '../services/swapService';
import { useAuth } from '../context/AuthContext';
import { ChatWindow } from '../components/chat/ChatWindow';
import { ArrowLeft, MessageSquare, RefreshCw } from 'lucide-react';

export const ChatPage = () => {
  const { swapId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchMessages = async () => {
    try {
      const data = await swapService.getMessages(swapId);
      setMessages(data.messages || []);
    } catch (err) {
      console.error('Failed to load chat messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 4000); // Polling for v0.1 chat
    return () => clearInterval(interval);
  }, [swapId]);

  const handleSendMessage = async (content) => {
    try {
      const newMsg = await swapService.sendMessage({
        swapRequestId: swapId,
        content,
      });
      fetchMessages();
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div className="space-y-4 text-xs text-gray-900">
      <div className="flex items-center justify-between">
        <Link to="/swaps" className="inline-flex items-center space-x-1 text-gray-700 hover:text-black font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Swap Requests</span>
        </Link>
        <span className="text-gray-500 font-mono">Negotiation Channel #{swapId?.slice(-6)}</span>
      </div>

      <div className="bg-white border border-gray-300 p-4 rounded flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-gray-700" />
          <div>
            <h1 className="text-base font-bold text-gray-900">Swap Negotiation Chat</h1>
            <p className="text-gray-500 text-[11px]">Discuss clothing measurements, fabric elasticity, condition details, and shipping or meetup location.</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white border border-gray-300 p-8 rounded text-center text-gray-500">
          Loading conversation thread...
        </div>
      ) : (
        <ChatWindow messages={messages} onSendMessage={handleSendMessage} currentUser={user} />
      )}
    </div>
  );
};
