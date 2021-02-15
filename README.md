# styled-components-v5

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Basics of styled-components

> **What I learned:**
>
> Global styling
>
> Conditional styling based on props
>
> Bulk styling with {css} from styled-components

In this section, I learned how to create my first React styled-component, and also how to pass props and render conditionally using these props. I also learned to use createGlobalStyle and how to add Google fonts to the project. Most importantly, I learned how to apply bulk styling using the css helper library from styled-components.

___

#### Using named exports instead of default exports:

```
|_src
  |_components
  |_common
    |_Button.js
    |_index.js
|_index.js
|_App.js
```

```jsx
// common/Button.js

const Button = styled.button`
...
`

export {Button};

//or

export const Button = styled.button`
...
`
```

```jsx
// common/index.js

import * from './Button'
```

```jsx
// App.js

import {Button} from '../components/common'
```

#### Bulk styling using css helper

```jsx
import styled, {css} from 'styled-components'

const Button = styled.button`
  ${props => props.large ? css`
	padding:10px;
	border-radius: 6px;
  ` : css`
    padding: 8px;
    border-radiouis: 4px;
  `}
`
```

## Building the layout and header

> **What I learned:**
>
> react-router-dom
>
> styling a Link component
>
> Toggling menu visibility
>
> Writing media queries
>

In this section, I created a main layout component called `PageLayout` that will hold the Header and the Content components. The Content component is passed the `children` prop, which is to be rendered within the Content component.

___

#### Styling the Link component based on routes using useLocation hook

As per [official documentation](https://styled-components.com/docs/basics#styling-any-component), styling a third-party component works with the styled() method as long as the className prop is attached and passed to a DOM element. Then, we make use of the useLocation, which returns  the location object that represents the URL. This hook returns a new location whenever the URL changes.

```jsx
import { Link as ReactRouterDomLink, useLocation } from 'react-router-dom' // any name is valid, we just need to avoid using the Link namespace

const Link = ({isActive, children, ...props}) => {
  return (
    <ReactRouterDomLink {...props}>
      {children}
    </ReactRouterDomLink>
  )
}

const StyledLink = styled(Link)`
  font-weight: ${props => props.isActive ? 'bold' : 'normal'};
`

...
export const Header = () => {
  const {pathname} = useLocation();
  return(
    <StyledLink to="/" isActive={pathname==='/'}>
      Home
    </StyledLink>
    <StyledLink to="/login" isActive={pathname==='/login'}>
      Login
    </StyledLink>   
  )
}

```

#### Using useState hook and onClick event handlers to toggle menu visibility

```jsx
export const Header = () => {
  const [menuOpen, setmenuOpen] = useState(false)

  return (
    <HeaderWrapper>
      <MobileMenuIcon onClick={() => setmenuOpen(!menuOpen)}>
		...
      </MobileMenuIcon>
      <Menu open={menuOpen}>
        <StyledLink to="/" isActive={pathname === '/'}>
          Home
        </StyledLink>
        <StyledLink to="/login" isActive={pathname === '/login'}>
          Login
        </StyledLink>
      </Menu>
    </HeaderWrapper>
  )
}

const Menu = styled.div`
  display: ${props => props.open ? 'block' : 'none'};
`
```

## Building the login UI

> **What I learned:**
>
> Creating forms and event handlers for submission and text field entry
>
> animation using styled-components keyframes

In this section, I learned how to style an input component, and how to use a single useState hook for multiple input fields. I learned to create forms and to conditionally render a spinner animation using keyframes.

____

#### Using one useState hook for managing multiple form fields

```jsx
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
      <Form>
        <Input 
          name="username" 
          placeholder="username" 
          onChange={handleInputChange}
          value={formFields.username}
          type="text"
          />

        <Input 
          name="password" 
          placeholder="password" 
          onChange={handleInputChange}
          value={formFields.password}
          type="password"
          />
      </Form>
  )
}
```

#### Using styled-components attrs helper method to inject attributes to a component

```jsx
const PasswordInputStyled = styled(Input).attrs(()=> ({
  type: 'password',
  placeholder: 'password'
}))`
  ...
`
```

which results to a PasswordInput component wherein we don't need to specify the type and placeholder attributes anymore.

```jsx
<PasswordInput 
  name="password" 
  onChange={handleInputChange}
  value={formFields.password}
/>
```

#### Loading spinner animation using keyframes helper method of styled-components

```jsx
import styled, {keyframes} from 'styled-components'

const rotation = keyframes`
  0%{
    transform: rotate(0deg);
  }

  100%{
    transform: rotate(360deg);
  }
`

export const Spinner = styled.div`
  height: 30px;
  width: 30px;
  border: 1px solid #f8049c;
  border-radius: 50%;
  border-top: none;
  border-right: none;
  margin: 16px auto;
  animation: ${rotation} 1s linear infinite;
`
```

## Variables and Theming

> **What I learned:**
>
> Using ThemeProvider and variables
>
> Dark theme toggle

In this section, I learned how to use the ThemeProvider component from styled-components and how to use variables to apply a global theme. I also created a dark theme toggle which makes use of the useContext hook under the hood to provide context information about the current theme to our components. I also learned to implement the dark and light theme to the global styles.

____

#### How to use ThemeProvider

```jsx
import { ThemeProvider } from 'styled-components'

const theme = {
  primaryColor: '#f8049c',
  secondaryColor: '#fdd54f'
}

const App = () => {
  return (
  	<ThemeProvider Theme={theme}>
  	  ...
  	</ThemeProvider>
  )
}

//Header.js
const HeaderWrapper = styled.header`
  ...
  background-image: linear-gradient(to right, ${props => props.theme.primaryColor}, ${props => props.theme.primaryColor})
`
```

#### Creating a dark theme toggle

Themes directory:

```jsx
//light.js
const theme = {
  id: 'light',
  primaryColor: '#f8049c',
  secondaryColor: '#fdd54f'
}

export default theme;

//dark.js
const theme = {
  id: 'dark',
  primaryColor: '#000',
  secondaryColor: 'midnightblue'
}

export default theme;
```

App.js:

Note that the useState() hook gets the object from the themes directory, in this case, it defaults to LightTheme (light.js).

```jsx
import LightTheme from '../themes/light'
import DarkTheme from '../themes/dark'

const App = () => {
  const [theme, setTheme] = useState(LightTheme)
  console.log(theme)
    // Object:
    // id: "light"
	// primaryColor: "#f8049c"
	// secondaryColor: "#fdd54f"
  return (
    <ThemeProvider theme={{
      ...theme, 
      setTheme: () => {
        setTheme(state => state.id === 'light' ? DarkTheme : LightTheme)
      }
    }}>
      ...
    </ThemeProvider>
  );
}
```

Toggle.js:

```jsx
const ToggleWrapper = styled.div`
  width: 50px;
  min-width: 50px;
  height: 25px;
  border-radius: 25px;
  border: 1px solid #666;
  margin: auto;
  display: flex;
  background-image: linear-gradient(to bottom, ${props => props.theme.primaryColor}, ${props => props.theme.secondaryColor});
`

const Notch = styled.div`
  height: 21px;
  width: 21px;
  border: 1px solid #666;
  margin-top: 1px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.1s linear;
  transform: translate(${props => props.isActive ? '26px' : '1px'});
`

export const Toggle = ({isActive, onToggle}) => {
  return (
    <ToggleWrapper onClick={onToggle}>
      <Notch isActive={isActive} />
    </ToggleWrapper>
  )
}
```

Header.js: Note that useContext(ThemeContext) has id as one of its parameter because it is destructured from App.js's `...theme` spread operator.

```jsx
import React, {useState, useContext} from 'react'
import styled, {ThemeContext} from 'styled-components'

import {Toggle} from './Toggle'

...

export const Header = () => {
  const {id, setTheme} = useContext(ThemeContext)

  return (
    ...
        <Toggle isActive={id === 'dark'} onToggle={setTheme}/>
      
  )
}
```

#### Implementing dark theme

themes directory:

```jsx
//light.js
const theme = {
  id: 'light',
  primaryColor: '#f8049c',
  secondaryColor: '#fdd54f',
  bodyBackgroundColor: '#fff',
  bodyFontColor: '#000'
}

export default theme;

//dark.js
const theme = {
  id: 'dark',
  primaryColor: '#000',
  secondaryColor: 'midnightblue',
  bodyBackgroundColor: '#000',
  bodyFontColor: '#fff'
}

export default theme;
```

App.js Global style:

```jsx
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.bodyBackgroundColor};
    color: ${props => props.theme.bodyFontColor};
    ...
  }
`
```

