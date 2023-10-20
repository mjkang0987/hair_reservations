import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --big-font: 24px;
    --font: 18px;
    --small-font: 16px;
    --tiny-font: 14px;

    --black-color: #222;
    --gray-color: #9f9f9f;
    --dark-gray-color: #525252;
    --light-gray-color: #e4e4e4;
    --white-color: #fff;
    --blue-color: #00a6e3;
    --orange-color: #fd7200;
    
    --white-color-80: rgb(255 255 255 / .8);
    --white-color-60: rgb(255 255 255 / .6);
    --white-color-40: rgb(255 255 255 / .40);
    
    --bar-top: 56px;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    height: 100%;
  }

  body {
    font-family: "SF Pro AR", "SF Pro Gulf", "SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif
  }

  #__next {
    display: flex;
    flex-direction: column;
    height: 100%;
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
  article,
  ul,
  ol,
  li {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  button,
  input,
  a {
    font-size: var(--font);
    color: var(--black-color);
  }

  button,
  a {
    cursor: pointer;

    &:active {
      opacity: .6;
    }
  }
  
  a {
    text-decoration: none;
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

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes asideHide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;
