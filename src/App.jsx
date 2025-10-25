import { useMemo, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';

const initialConversations = [
  {
    id: '1',
    name: 'Aurelia VanderGilt',
    title: 'Philanthropist • Venture Chair',
    netWorth: '$18.2B',
    color: 'from-amber-300 to-yellow-500',
    messages: [
      { id: 'm1', text: 'Welcome to Aurum Chat. Shall we discuss the lunar resort?', fromSelf: false, time: Date.now() - 1000 * 60 * 60 },
      { id: 'm2', text: 'Absolutely. I can share projections and private renderings.', fromSelf: true, time: Date.now() - 1000 * 60 * 55 },
      { id: 'm3', text: 'Splendid. Discretion is paramount.', fromSelf: false, time: Date.now() - 1000 * 60 * 50 },
    ],
  },
  {
    id: '2',
    name: 'Cassius Roth',
    title: 'Family Office CIO',
    netWorth: '$7.4B',
    color: 'from-emerald-300 to-teal-500',
    messages: [
      { id: 'm1', text: 'Need a quiet allocation into exotics. No press.', fromSelf: false, time: Date.now() - 1000 * 60 * 90 },
      { id: 'm2', text: 'I’ll structure a discreet vehicle with tiered access.', fromSelf: true, time: Date.now() - 1000 * 60 * 85 },
    ],
  },
  {
    id: '3',
    name: 'Nova Li',
    title: 'Orbital Infrastructure',
    netWorth: '$22.9B',
    color: 'from-fuchsia-300 to-pink-500',
    messages: [
      { id: 'm1', text: 'Docking rights cleared. Champagne later?', fromSelf: false, time: Date.now() - 1000 * 60 * 15 },
    ],
  },
];

export default function App() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState(initialConversations[0].id);

  const selectedConversation = useMemo(
    () => conversations.find((c) => c.id === selectedId) || conversations[0],
    [conversations, selectedId]
  );

  const handleSend = (text) => {
    if (!text.trim()) return;
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== selectedConversation.id) return c;
        const newMsg = { id: crypto.randomUUID(), text, fromSelf: true, time: Date.now() };
        return { ...c, messages: [...c.messages, newMsg] };
      })
    );
    // Simulated concierge reply
    setTimeout(() => {
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== selectedConversation.id) return c;
          const reply = {
            id: crypto.randomUUID(),
            text: 'Concierge: Your request is being handled with utmost discretion.',
            fromSelf: false,
            time: Date.now(),
          };
          return { ...c, messages: [...c.messages, reply] };
        })
      );
    }, 900);
  };

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100 font-[Inter]">
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_-10%_-20%,rgba(212,175,55,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_110%_120%,rgba(99,102,241,0.06),transparent)]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8">
        <div className="rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden">
          <Header />

          <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] h-[calc(100vh-180px)] md:h-[70vh] lg:h-[72vh]">
            <Sidebar
              conversations={conversations}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
            <ChatWindow conversation={selectedConversation} onSend={handleSend} />
          </div>
        </div>
      </div>
    </div>
  );
}
