"use client";

import { useState, useCallback } from "react";

const BOT_REPLIES = [
  "I hear you 💕 That makes complete sense. Your feelings are always valid here.",
  "During your follicular phase, try adding iron-rich foods like spinach and lentils 🌿",
  "It's okay to take it slow today ☁️ Rest is not laziness — it's wisdom.",
  "Cramps on day 1–2 are typically the most intense. A warm compress helps a lot 🍵",
  "For PCOS support, reducing refined sugar can help regulate blood sugar and hormones 🌿",
  "Sending you so much gentleness right now 🌷 You're doing better than you think.",
  "That's completely normal for the luteal phase. Honor how you feel 🌙",
];

let replyIndex = 0;

export function useChat() {
  const [messages, setMessages] = useState([
    { id:"0", role:"bot", text:"Hey lovely 🌸 I'm CYRA. I'm here for you. How are you feeling today?" },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback((text) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), role:"user", text }]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id:   (Date.now()+1).toString(),
        role: "bot",
        text: BOT_REPLIES[replyIndex++ % BOT_REPLIES.length],
      }]);
      setIsTyping(false);
    }, 1100);
  }, []);

  return { messages, sendMessage, isTyping };
}
