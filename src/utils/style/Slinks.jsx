import { Link, NavLink } from 'react-router-dom'
// import styled, { keyframes } from 'styled-components'
import styled from 'styled-components'
// import colors from './colors'

// const rotate = keyframes`
//   from {
//     transform: rotate(0deg);
//   }

//   to {
//     transform: rotate(360deg);
//   }
// `

// export const Loader = styled.div`
//   padding: 10px;
//   border: 6px solid ${colors.primary};
//   border-bottom-color: transparent;
//   border-radius: 22px;
//   animation: ${rotate} 1s infinite linear;
//   height: 0;
//   width: 0;
// `

export const StyledLink = styled(NavLink)`
  padding: 10px 15px;
  color: #FF6060;
  text-decoration: none;
  font-size: 24px;
  text-align: center;
  margin:0 !important;
  &.active { 
    text-decoration: underline;
  }
      @media screen and (max-width: 768px) {
        font-size: 14px;
        padding: 133px 0 0 10px;
        // padding-top: 133px;
    }
`
export const StyledNav = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 24px;
  margin: 3.5%;
  padding-left: 0;
  &:hover {
            text-decoration: underline;
        }
`
export const ErrorLink = styled(Link)`
    color: #FF6060;
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    padding-top: 182px;
    &.a {
        font-size: 18px;
    }
        &:hover {
            text-decoration: underline;
        }
`