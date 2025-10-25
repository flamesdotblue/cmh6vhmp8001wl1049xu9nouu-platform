import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

function Avatar({ name, color }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${color} text-neutral-900 flex items-center justify-center font-semibold`}> 
      {initials}
    </div>
  );
}

export default function Sidebar({ conversations, selectedId, onSelect }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return conversations;
    const q = query.toLowerCase();
    return conversations.filter((c) => c.name.toLowerCase().includes(q) || c.title.toLowerCase().includes(q));
  }, [conversations, query]);

  return (
    <aside className="border-r border-white/10 bg-neutral-900/40">
      <div className="p-4">
        <div className="relative">
          <input
            className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
            placeholder="Search inner circle"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search className="h-4 w-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="overflow-y-auto max-h-[calc(100%-80px)] pb-2">
        {filtered.map((c) => {
          const isActive = c.id === selectedId;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 transition relative ${
                isActive ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
            >
              <Avatar name={c.name} color={c.color} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate">{c.name}</p>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-300/20">{c.netWorth}</span>
                </div>
                <p className="text-xs text-neutral-400 truncate">{c.title}</p>
                {c.messages.length > 0 && (
                  <p className="text-xs text-neutral-500 truncate mt-0.5">
                    {c.messages[c.messages.length - 1].fromSelf ? 'You: ' : ''}
                    {c.messages[c.messages.length - 1].text}
                  </p>
                )}
              </div>
              {isActive && (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_0_3px_rgba(212,175,55,0.25)]" />
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
