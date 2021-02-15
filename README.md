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
> Using one useState hook for multiple fields

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

