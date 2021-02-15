import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const largeStyles = (props) => {
  if (props.large) {
    return css`
      padding: 10px;
      border-radius: 5px;
      font-size: 1.5em;
      `
  } else {
    css`
      padding: 8px;
      border-radius: 4px;
      font-size: 1em;
      `
  }
}

export const Button = styled.button`
  color: white;
  background-color: ${props => props.secondary ? props.theme.secondaryColor : props.theme.primaryColor};
  font-weight: bold;
  ${largeStyles}
  
  box-shadow: none;
  width: 100%;
  display: block;
  white-space: none;

  &:disabled {
    background-color: #eee;
    color: #666;
  }
`

Button.propTypes = {
  large: PropTypes.bool,
  secondary: PropTypes.bool
}