import React, {useState, useEffect} from 'react'
import { PageLayout, Input, PasswordInput, Button, Spinner } from '../common'
import styled from 'styled-components'

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border: 1px solid #eee;
  padding: 16px;
  box-sizing: border-box;
  color: #000;
  border-radius: 4px;

  .alt-text {
    text-align: center;
    margin: 10px 0;
  }

  >${Button}:first-of-type {
    margin-top: 40px;
  }
  
  >${Input} {
    margin-top: 20px;
  }
  
`

let timeout;

const Login = () => {
  const [formFields, setformFields] = useState({username: '', password: ''})
  const [loading, setLoading] = useState(false)

  const handleInputChange = (event) => {
    event.persist()
    setformFields(state => ({
      ...state,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    timeout = setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  useEffect(() => {
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [])

  return (
    <PageLayout>
      <h1>
        Login
      </h1>
      <Form onSubmit={handleSubmit}>
        {loading ? <Spinner /> :
        <>
        <span>
          Login if you have an account
        </span>
        <Input 
          name="username" 
          placeholder="username" 
          onChange={handleInputChange}
          value={formFields.username}
          type="text"
          />

        <PasswordInput 
          name="password" 
          onChange={handleInputChange}
          value={formFields.password}
          />
        </>
        }
          
          <Button large type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </Button>

          {!loading && 
          <>
          <div className="alt-text">
            or
          </div>
          <Button secondary type="button">
            Register
          </Button>
          
          </>
          }
            
      </Form>
    </PageLayout>
  )
}

export default Login;