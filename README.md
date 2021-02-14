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
> 

In this section, I learned how to create my first React styled-component, and also how to 

___

#### h4