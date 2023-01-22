import { useState } from 'react'
import { useAuth2 } from '~/AuthProvider'

export const PortalPage = () => {
  const [count, setCount] = useState(0)
  const {
    user: { name, permissions },
  } = useAuth2()

  const onFetch = async () => {
    try {
      const res = await fetch('/api/test')
      if (!res.ok) {
        console.error(res)
        throw new Error('res not ok')
      }
      console.log(res.ok)
      const json = await res.json()
      console.log(json)
    } catch (error) {
      console.error(error)
    }
  }

  const onClickMenu = (id) => (e) => {
    console.info(id)
  }

  return (
    <div>
      <h1>Tela protegida do portal</h1>
      <p>Name: {name}</p>
      <p>Permissoes:</p>
      <ul>
        {permissions.map((p) => (
          <li key={p} onClick={onClickMenu(p)}>
            {p}
          </li>
        ))}
      </ul>

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <button onClick={onFetch}>fetch</button>
      </div>
    </div>
  )
}
