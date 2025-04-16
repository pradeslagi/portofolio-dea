'use client';

import { useState } from 'react';
import '../styles/chatbot.css'; // styling terpisah biar rapi

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hai! Aku Gemini AI. Ada yang bisa aku bantu?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch('/api/gemini-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      const aiMessage = { type: 'bot', text: data.response || 'Maaf, aku tidak bisa menjawabnya sekarang.' };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { type: 'bot', text: 'Terjadi kesalahan. Silakan coba lagi.' },
      ]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <main className="chatbot-container">
      <h1>🤖 Chatbot Gemini AI</h1>
      <div className="chatbox">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.type}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && <div className="message bot"><p>Mengetik...</p></div>}
      </div>
      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          placeholder="Tanyakan sesuatu..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Kirim
        </button>
      </form>
    </main>
  );
}
