import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import Composer from './Composer';

function MessageBubble({ msg }) {
  const isSelf = msg.fromSelf;
  return (
    <div className={`flex ${isSelf ? 'justify-end' : 'justify-start'} px-2`}> 
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className={`max-w-[78%] rounded-2xl px-4 py-2.5 mb-2 shadow-lg ${
          isSelf
            ? 'bg-gradient-to-br from-amber-300 to-yellow-600 text-neutral-900'
            : 'bg-white/5 text-neutral-100 border border-white/10'
        }`}
      >
        <p className="text-sm leading-relaxed break-words">{msg.text}</p>
        <div className={`mt-1.5 text-[10px] ${isSelf ? 'text-neutral-800/80' : 'text-neutral-400'}`}>
          {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </motion.div>
    </div>
  );
}

export default function ChatWindow({ conversation, onSend }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [conversation?.messages?.length, conversation?.id]);

  if (!conversation) {
    return (
      <section className="flex items-center justify-center">
        <p className="text-neutral-400">Select a conversation</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
        <div>
          <h2 className="font-semibold tracking-tight">{conversation.name}</h2>
          <p className="text-xs text-neutral-400">{conversation.title}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-300/90">
          <ShieldCheck className="h-4 w-4" />
          <span>End-to-end encrypted</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-2 sm:px-4 py-4 bg-gradient-to-b from-transparent to-black/20">
        <AnimatePresence initial={false}>
          {conversation.messages.map((m) => (
            <MessageBubble key={m.id} msg={m} />
          ))}
        </AnimatePresence>
      </div>

      <div className="border-t border-white/10 bg-neutral-900/60">
        <Composer onSend={onSend} placeholder={`Message ${conversation.name}`} />
      </div>
    </section>
  );
}
