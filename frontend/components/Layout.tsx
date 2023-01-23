import { ReactNode } from 'react'

export const Layout = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'flex-start',
      gap: 32,
      minWidth: '100%',
      height: '100%',
      background: '#eee',
      border: '4px solid #333',
      borderRadius: '2em',
      padding: '1em',
      overflow: 'auto',
    }}
  >
    {children}
  </div>
)
