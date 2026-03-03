import { BrowserLayout } from '@/layout'

const Index = () => {
  const [messages, setMessages] = useState<{ text: string; type: 'user' | 'bot' }[]>([])
  const [input, setInput] = useState('')

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
      <div className="chat-area">
        {messages.length === 0 && (
          <div className="chat-empty">開始聊天吧 ...</div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message chat-message--${msg.type}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input-bar">
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="輸入訊息..."
        />
        <button
          className="chat-send-btn"
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
