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

  body {
    font-family: "SF Pro AR", "SF Pro Gulf", "SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif
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
  a {
    cursor: pointer;

    &:active {
      opacity: .6;
    }
  }

  input {
    width: 100%;
  }

  .a11y {
    overflow: hidden;
    position: absolute;
    border: 0;
    margin: -1px;
    width: 1px;
    height: 1px;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
  }
`;
