import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --big-font: 24px;
    --font: 18px;
    --small-font: 16px;
    --tiny-font: 14px;

    --black-color: hsl(0, 0%, 13%);
    --gray-color: hsl(0, 0%, 62%);
    --dark-gray-color: hsl(0, 0%, 32%);
    --light-gray-color: hsl(0, 0%, 89%);
    --white-color: hsl(0, 0%, 100%);
    --blue-color: hsl(196, 100%, 45%);
    --orange-color: hsl(27, 100%, 50%);

    --white-color-80: hsla(0, 0%, 100%, .8);
    --white-color-60: hsla(0, 0%, 100%, .6);
    --white-color-40: hsla(0, 0%, 100%, .4);

    --bar-top: 56px;

    --first-color: hsl(0, 100%, 91%);
    --second-color: hsl(187, 82%, 89%);
    --third-color: hsl(334, 100%, 84%);
    --fourth-color: hsl(127, 100%, 87%);
    --fifth-color: hsl(52, 100%, 87%);
    --sixth-color: hsl(223, 100%, 87%);
    --seventh-color: hsl(25, 100%, 87%);
    --eighth-color: hsl(285, 100%, 87%);
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

  @keyframes down {
    0% {
      transform: translateY(var(--bar-top));
    }

    100% {
      transform: translateY(var(--timeline-height));
    }
  }
`;
