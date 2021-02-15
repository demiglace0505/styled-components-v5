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