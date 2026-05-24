// hooks/useChat.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

export function useChat() {
  const { data: session } = useSession();
  const [messages,   setMessages]   = useState([]);
  const [sessionId,  setSessionId]  = useState(null);
  const [isTyping,   setIsTyping]   = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState(null);

  // Load chat history on mount
  useEffect(() => {
    if (!session) return;
    setLoading(true);
    fetch("/api/chat")
      .then(r => r.json())
      .then(data => {
        if (data.session) {
          setSessionId(data.session.id);
          setMessages(
            data.session.messages.map(m => ({
              id:   m.id,
              role: m.role,
              text: m.content,
            }))
          );
        }
        // If no messages yet, show the welcome message
        if (!data.session?.messages?.length) {
          setMessages([{ id: "0", role: "bot", text: "Hey lovely 🌸 I'm CYRA. I'm here for you. How are you feeling today?" }]);
        }
      })
      .catch(() => {
        setMessages([{ id: "0", role: "bot", text: "Hey lovely 🌸 I'm CYRA. I'm here for you. How are you feeling today?" }]);
      })
      .finally(() => setLoading(false));
  }, [session]);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || !session) return;

    // Optimistic update
    const tempId = Date.now().toString();
    setMessages(prev => [...prev, { id: tempId, role: "user", text }]);
    setIsTyping(true);

    try {
      const res  = await fetch("/api/chat", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ message: text, sessionId }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setSessionId(data.sessionId);
      setMessages(prev => [
        ...prev,
        { id: data.botMessage.id, role: "bot", text: data.botMessage.content },
      ]);
    } catch (err) {
      setError(err.message);
      // Show fallback
      setMessages(prev => [
        ...prev,
        { id: "err", role: "bot", text: "I'm having trouble connecting right now 💕 Please try again in a moment." },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [session, sessionId]);

  return { messages, isTyping, loading, error, sendMessage };
}