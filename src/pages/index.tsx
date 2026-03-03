import { BrowserLayout } from '@/layout'

const Index = () => {
  const [messages, setMessages] = useState<{ text: string; type: 'user' | 'bot' }[]>([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    setMessages((prev) => [...prev, { text: trimmed, type: 'user' }])
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <BrowserLayout url="chat.app">
      <div className="flex h-[400px] flex-col gap-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="flex flex-1 items-center justify-center text-[15px] tracking-wide text-[#b4a0d6]">
            開始聊天吧 ...
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={
              msg.type === 'user'
                ? 'animate-fade-in max-w-[70%] self-end rounded-2xl rounded-br-sm bg-linear-to-br from-[#c4b5fd] to-[#b794f4] px-4 py-2.5 text-sm leading-relaxed text-white'
                : 'animate-fade-in max-w-[70%] self-start rounded-2xl rounded-bl-sm bg-linear-to-br from-[#f3edff] to-[#ebe3fb] px-4 py-2.5 text-sm leading-relaxed text-[#553c9a]'
            }
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-auto flex gap-2.5 border-t border-[rgba(183,148,244,0.15)] pt-4">
        <input
          className="flex-1 rounded-xl border-[1.5px] border-[rgba(183,148,244,0.3)] bg-[rgba(250,247,255,0.8)] px-[18px] py-3 text-sm text-[#44337a] outline-none transition-all placeholder:text-[#c4b0e0] focus:border-[#b794f4] focus:shadow-[0_0_0_3px_rgba(183,148,244,0.15)]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="輸入訊息..."
        />
        <button
          className="cursor-pointer whitespace-nowrap rounded-xl border-none bg-linear-to-br from-[#b794f4] to-[#9f7aea] px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(159,122,234,0.35)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:translate-y-0"
          onClick={handleSend}
          disabled={!input.trim()}
        >
          送出
        </button>
      </div>
    </BrowserLayout>
  )
}

export default Index
