interface BrowserLayoutProps {
  url?: string
  children: React.ReactNode
}

const BrowserLayout = ({ url = 'chat.app', children }: BrowserLayoutProps) => {
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
            {url}
          </div>
        </div>

        <div className="browser-body">
          {children}
        </div>
      </div>
    </div>
  )
}

export { BrowserLayout }
