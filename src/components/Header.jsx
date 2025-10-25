import { Crown, Settings, Star } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-300 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Crown className="h-5 w-5 text-neutral-900" />
          </div>
          <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center">
            <Star className="h-3 w-3 text-amber-300" />
          </div>
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Aurum Chat</h1>
          <p className="text-xs text-neutral-400">Discreet. Bespoke. Beyond ordinary.</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm">New Thread</button>
        <button className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition flex items-center justify-center">
          <Settings className="h-5 w-5 text-neutral-200" />
        </button>
      </div>
    </header>
  );
}
