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
    <div className="browser-wrapper">
      <div className="browser-frame">
        <div className="browser-toolbar">
          <div className="browser-dots">
            <span className="browser-dot browser-dot--red" />
            <span className="browser-dot browser-dot--yellow" />
            <span className="browser-dot browser-dot--green" />
          </div>
          <div className="browser-address-bar">
            lottie-chat.app
          </div>
        </div>

        <div className="browser-body">
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
        </div>
      </div>
    </div>
  )
}

export default Index
