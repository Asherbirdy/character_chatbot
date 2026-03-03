interface BrowserLayoutProps {
  url?: string
  children: React.ReactNode
}

const BrowserLayout = ({ url = 'chat.app', children }: BrowserLayoutProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-[#e8dff5] via-[#f0e6ff] to-[#ede4f7] p-6">
      <div className="flex w-full max-w-[800px] min-h-[560px] flex-col overflow-hidden rounded-2xl bg-white/85 shadow-[0_8px_32px_rgba(128,90,213,0.15),0_2px_8px_rgba(128,90,213,0.08)] backdrop-blur-xl">
        <div className="flex items-center gap-3 bg-linear-to-r from-[#d6bcfa] via-[#c4b5fd] to-[#b794f4] px-[18px] py-3.5">
          <div className="flex shrink-0 gap-[7px]">
            <span className="size-3 rounded-full bg-[#fc5c65]" />
            <span className="size-3 rounded-full bg-[#fed330]" />
            <span className="size-3 rounded-full bg-[#26de81]" />
          </div>
          <div className="flex-1 rounded-lg border border-white/40 bg-white/60 px-4 py-[7px] text-[13px] tracking-wide text-[#6b46c1]">
            {url}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export { BrowserLayout }
