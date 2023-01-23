import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '~/AuthProvider'

export const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  const from = location.state?.from?.pathname || '/'

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
      if (!res.ok) {
        console.error(res)
        throw new Error('res not ok')
      }
      const json = await res.json()
      if (json.success) {
        const { id, username: name, permissions } = json
        auth.signin({ id, name, permissions }, () => {
          navigate(from, { replace: true })
        })
      } else {
        throw Error(json)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1em',
        }}
        onSubmit={handleSubmit}
      >
        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1em',
          }}
        >
          Usuário
          <input name="username" />
        </label>
        <label
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Senha
          <input type="password" name="password" />
        </label>

        <button style={{ background: '#6666ff' }}>Entrar</button>
      </form>
    </div>
  )
}
