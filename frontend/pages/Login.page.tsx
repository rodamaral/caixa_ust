import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '~/AuthProvider'

export const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  const from = location.state?.from?.pathname || '/'

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string

    auth.signin(username, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page. This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true })
    })
  }

  return (
    <div>
      <h1>Tela de login</h1>

      <form onSubmit={handleSubmit}>
        Usuário
        <input name="username" />
        Senha
        <input type="password" name="password" />
        <button>Entrar</button>
        go next to: {from}
      </form>
    </div>
  )
}
