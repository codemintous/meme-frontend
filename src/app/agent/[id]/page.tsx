"use client"
import { useState } from 'react';
import Image from 'next/image';
import { Send, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Message {
  role: 'user' | 'agent';
  content: string;
}

export default function AgentDetail() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  // This would normally come from an API or database
  const agentData = {
    name: "The Nutting Professor",
    category: "Science",
    chain: "PRONUT",
    id: "b3l49nw_jr",
    image: "/agents/meme1.png",
    description: "Trust me, you don't want to run into The Nutting Professor after the last bell rings!"
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const newUserMessage: Message = { role: 'user', content: inputMessage };
    const newMessages = [...messages, newUserMessage];
    
    // Simulate agent response (in a real app, this would be an API call)
    setTimeout(() => {
      const agentResponse: Message = {
        role: 'agent',
        content: `Hello! I am ${agentData.name}. Thanks for your message: "${inputMessage}"`
      };
      setMessages([...newMessages, agentResponse]);
    }, 1000);

    setMessages(newMessages);
    setInputMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        {/* Agent Info */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="flex gap-6 items-start">
            <div className="relative w-32 h-32">
              <Image
                src={agentData.image}
                alt={agentData.name}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{agentData.name}</h1>
              <p className="text-gray-400 mb-2">{agentData.category}</p>
              <div className="bg-purple-900 text-purple-200 px-3 py-1 rounded-full inline-block">
                {agentData.chain}
              </div>
              <p className="mt-4 text-gray-300">{agentData.description}</p>
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">Chat with {agentData.name}</h2>
          
          {/* Messages */}
          <div className="space-y-4 mb-6 h-[400px] overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-200'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-purple-600 hover:bg-purple-700 rounded-lg p-2"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 