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

