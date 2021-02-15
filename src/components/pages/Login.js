import React, {useState} from 'react'
import { PageLayout, Input, PasswordInput } from '../common'
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
`

const Login = () => {
  const [formFields, setformFields] = useState({username: '', password: ''})

  const handleInputChange = (event) => {
    event.persist()
    setformFields(state => ({
      ...state,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <PageLayout>
      <h1>
        Login
      </h1>
      <Form>
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
      </Form>
    </PageLayout>
  )
}

export default Login;