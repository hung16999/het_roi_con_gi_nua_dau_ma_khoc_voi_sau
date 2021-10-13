import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

export interface Account {
  email: string
  password: string
}

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  // const dispatch = useDispatch<Dispatch<any>>()
  const { user, errorLogin } = useSelector((store: any) => store)
  const history = useHistory()

  useEffect(() => {
    if (user) {
      history.push('/admin')
    } else {
      history.push('/login')
    }
  }, [user, history])

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target

    switch (name) {
      case 'email': {
        setEmail(value)
        break
      }
      case 'password': {
        setPassword(value)
        break
      }
    }
  }

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const account: Account = { email: email, password: password }
    console.log(account)

    // dispatch(logIn(account))
  }

  return (
    <div className="text-center mt-5">
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={email}
          name="email"
          onChange={handleOnChange}
          placeholder="email"
        />

        <input
          type="password"
          value={password}
          name="password"
          onChange={handleOnChange}
          placeholder="password"
        />

        <button>login</button>
      </form>
      {errorLogin && (
        <div className="text-danger">username or password is incorrect</div>
      )}
    </div>
  )
}

export default Login
