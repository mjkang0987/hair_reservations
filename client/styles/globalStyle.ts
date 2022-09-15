import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
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

  main {
    display: grid;
    height: 100%;
  }
  
  button,
  input {
    background-color: transparent;
    border: 1px solid #ccc;
    padding: 5px 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
  }
`;
