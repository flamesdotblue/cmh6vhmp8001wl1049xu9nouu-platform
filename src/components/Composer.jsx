import { useState } from 'react';
import { Paperclip, Send } from 'lucide-react';

export default function Composer({ onSend, placeholder }) {
  const [value, setValue] = useState('');
  const canSend = value.trim().length > 0;

  const submit = () => {
    if (!canSend) return;
    onSend(value);
    setValue('');
  };

  return (
    <div className="p-3 sm:p-4">
      <div className="flex items-end gap-2 sm:gap-3">
        <button
          className="h-10 w-10 shrink-0 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition flex items-center justify-center"
          title="Attach"
        >
          <Paperclip className="h-5 w-5 text-neutral-300" />
        </button>
        <div className="flex-1">
          <div className="rounded-2xl border border-white/10 bg-neutral-900/70 focus-within:ring-2 focus-within:ring-amber-300/40">
            <textarea
              rows={1}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  submit();
                }
              }}
              placeholder={placeholder || 'Compose a message'}
              className="w-full resize-none bg-transparent outline-none px-4 py-3 text-sm placeholder:text-neutral-500"
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-[11px] text-neutral-500">Press Enter to send • Shift+Enter for new line</p>
            <button
              onClick={submit}
              disabled={!canSend}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition shadow ${
                canSend
                  ? 'bg-gradient-to-r from-amber-300 to-yellow-600 text-neutral-900 hover:brightness-105'
                  : 'bg-white/5 text-neutral-500 cursor-not-allowed border border-white/10'
              }`}
            >
              <Send className="h-4 w-4" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
