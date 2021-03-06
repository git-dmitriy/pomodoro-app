import { createGlobalStyle } from 'styled-components';
import { baseTheme } from 'theme';

type P = {
  bg: 'focus' | 'break' | 'rest' | 'standby';
};

const handleColorType = (color: string) => {
  switch (color) {
    case 'focus':
      return baseTheme.colors.focus;
    case 'break':
      return baseTheme.colors.break;
    case 'rest':
      return baseTheme.colors.rest;
    default:
      return baseTheme.colors.standby;
  }
};

export const GlobalStyles = createGlobalStyle<P>`
*,
*::before,
*::after {
  box-sizing: border-box;
}

:root {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
  background-color: ${(props) => handleColorType(props.bg)};
}
::-webkit-scrollbar {
  inline-size: 0.5rem;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

body {
  min-block-size: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  font-family: 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas',
      'Liberation Mono', 'Courier New', monospace;
  color: white;
  user-select: none;
}

body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}

ul,
ol {
  padding: 0;
  list-style: none;
}

a:not([class]) {
  text-decoration-skip-ink: auto;
}

input,
button,
textarea,
select {
  font: inherit;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

`;
