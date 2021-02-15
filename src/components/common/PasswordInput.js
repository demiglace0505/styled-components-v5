import React, { useState } from 'react'
import styled from 'styled-components'
import { Input } from './Input'

const PasswordInputWrapper = styled.div`
  display:flex;
  //next sibling :
  ~div{
    margin-bottom: 8px;
  }
`

const PasswordInputStyled = styled(Input).attrs(() => ({
  type: 'password',
  placeholder: 'password'
}))`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`

const ToggleButton = styled.div`
  height: 40px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 0.9em;
  display: flex;
  border-left: 0;
  padding: 8px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  background-color: #fff;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  color: #000;
`

export const PasswordInput = (props) => {
  const [showPassword, setshowPassword] = useState(false)

  return (
    <>
      <PasswordInputWrapper>
        <PasswordInputStyled {...props} />
        <ToggleButton onClick={() => setshowPassword(!showPassword)}>
          {showPassword ? 'hide' : 'show'}
        </ToggleButton>
      </PasswordInputWrapper>
      <div>
        {showPassword ? props.value : ''}
      </div>
    </>
  )
}