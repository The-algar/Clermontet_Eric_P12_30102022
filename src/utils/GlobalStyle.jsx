import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  html, body {
    min-width: 768px !important;
    margin: auto;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    box-sizing: border-box;
    padding: 0;
  }

  *, *::after, *::before {
    box-sizing: border-box;
  }

  #root {
    margin: auto;
    overflow: hidden;

    @media (min-width: 991px) {
      max-width: 1440px;
      max-height: auto;
    }
  }
`
