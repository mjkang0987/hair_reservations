import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --defaultFont: 18px;
    --defaultBlack: #222;
    --defaultGray: #9f9f9f;
    --defaultWhite: #fff;
  }

  html,
  body {
    padding: 0;
    margin: 0;
  }

  h1,
  h2,
  div,
  p,
  a,
  button,
  aside,
  main,
  header,
  footer,
  section,
  article {
    margin: 0;
    padding: 0;
  }

  button,
  input,
  a {
    font-size: var(--defaultFont);
    color: var(--defaultBlack);
  }

  button,
  input {
    height: 40px;
    border: 1px solid #ccc;
    background-color: var(--defaultWhite);
    border-radius: 5px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
  }

  button,
  a {
    cursor: pointer;

    &:active {
      opacity: .6;
    }
  }
`;
