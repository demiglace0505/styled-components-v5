import React, { useState } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Login from './pages/Login'
import Home from './pages/Home'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import LightTheme from '../themes/light'
import DarkTheme from '../themes/dark'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.bodyBackgroundColor};
    color: ${props => props.theme.bodyFontColor};
    min-height: 100vh;
    margin: 0;
    font-family: 'Kaushan Script'
  }
`

const App = () => {
  const [theme, setTheme] = useState(LightTheme)
  
  return (
    <ThemeProvider theme={{
      ...theme, setTheme: () => {
        setTheme(state => state.id === 'light' ? DarkTheme : LightTheme)
      }
    }}>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
