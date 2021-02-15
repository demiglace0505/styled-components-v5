import React, { useState, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Link as ReactRouterDomLink, useLocation } from 'react-router-dom'

import { Toggle } from './Toggle'

const HeaderWrapper = styled.header`
  height: 60px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  padding: 0 16px;
  position: fixed;
  top: 0;
  background-image: linear-gradient(to right, ${props => props.theme.primaryColor}, ${props => props.theme.secondaryColor});
  border-bottom: ${props => props.theme.secondaryColor} 3px solid;
`

const Menu = styled.div`
  display: ${props => props.open ? 'block' : 'none'};
  font-family: 'Open Sans';
  position: absolute;
  width: 100%;
  top: 60px;
  left: 0;
  padding: 8px;
  box-sizing: border-box;
  border-bottom: ${props => props.theme.secondaryColor} 3px solid;
  background-color: ${props => props.theme.bodyBackgroundColor};
  
  @media(min-width: 768px) {
    display: flex;
    position: relative;
    width: initial;
    left: initial;
    top: initial;
    background: none;
    border-bottom: none;
    margin: auto 0 auto auto;
  }
`

const Link = ({ isActive, children, ...props }) => {
  return (
    <ReactRouterDomLink {...props}>
      {children}
    </ReactRouterDomLink>
  )
}

const StyledLink = styled(Link)`
  padding: 4px 8px;
  display: block;
  text-align: center;
  box-sizing: border-box;
  margin: auto 0;
  font-weight: ${props => props.isActive ? 'bold' : 'normal'};
  color: ${props => props.theme.bodyFontColor};
`

const MobileMenuIcon = styled.div`
  margin: auto 0 auto auto;
  width: 25px;
  min-width: 25px;
  padding: 5px;

  // 3 bars
  >div{
    height: 3px;
    background-color: ${props => props.theme.bodyFontColor};
    margin: 5px 0;
    width: 100%;
  }

  @media (min-width: 768px) {
    display: none;
  }
`

export const Header = () => {
  const { pathname } = useLocation()
  const [menuOpen, setmenuOpen] = useState(false)
  const {id, setTheme} = useContext(ThemeContext)

  return (
    <HeaderWrapper>
      <MobileMenuIcon onClick={() => setmenuOpen(!menuOpen)}>
        <div />
        <div />
        <div />
      </MobileMenuIcon>
      <Menu open={menuOpen}>
        <StyledLink to="/" isActive={pathname === '/'}>
          Home
        </StyledLink>
        <StyledLink to="/login" isActive={pathname === '/login'}>
          Login
        </StyledLink>
        <Toggle isActive={id === 'dark'} onToggle={setTheme}/>
      </Menu>
    </HeaderWrapper>
  )
}