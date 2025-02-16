'use client';

import { useState, useEffect } from 'react';

const MOTIVATION_MESSAGES = [
  "Let's build an empire together! 🚀",
  "Another day, another chance to focus! 💪",
  "Ready to crush your goals! Let's go! 🎯",
  "Focus mode: activated! 🎧",
  "Time to build something amazing! 🏗️",
  "Your future self will thank you! ⭐",
];

export default function MotivationalMessage() {
  const [message, setMessage] = useState(MOTIVATION_MESSAGES[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * MOTIVATION_MESSAGES.length);
    setMessage(MOTIVATION_MESSAGES[randomIndex]);
  }, []);
  
  return (
    <div className="text-center mb-4">
      <p className="text-lg font-medium text-indigo-600">{message}</p>
    </div>
  );
}
