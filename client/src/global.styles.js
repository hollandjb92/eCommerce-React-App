import {
  createGlobalStyle
} from 'styled-components'

export const GlobalStyles = createGlobalStyle `
body {
  font-family: "Open Sans Condensed";
  padding: 1.25rem 3.75rem;

  @media screen and (max-width: 800px) {
    padding: 0.625rem;
  } @media screen and (max-width: 800px) {
    padding: 0.625rem;
  }
}

a {
  text-decoration: none;
  color: #000;
}

* {
  box-sizing: border-box;
}
`;