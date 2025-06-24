import {createGlobalStyle} from 'styled-components';
import {baseTheme} from '@/config/baseTheme.ts';

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

        --bg-focus: #bc4b51;
        --bg-break: #5b8e7d;
        --bg-rest: #8cb369;
        --bg-standby: #22333b;
        
        // todo: convert pixels to rems
        --unit-1: 4px; //4px;
        --unit-2: 8px; //8px;
        --unit-3: 12px; //12px;
        --unit-4: 16px; //16px;
        --unit-5: 24px; //24px;
        --unit-6: 32px; //32px;
        --unit-7: 40px; //40px;
        --unit-8: 48px; //48px;
        
        --unit--7: -40px;
        
        --pomodoro-size: 30px;
        --button-size: 50px;
        
        --task-fs-1: 30px;
        --task-fs-2: 30px;
        --task-fs-3: 36px;
        --heading-fs: 3rem;
        
        
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
        overscroll-behavior: contain;
        text-rendering: optimizeSpeed;
        line-height: 1.2;
        font-family: 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas',
        'Liberation Mono', 'Courier New', monospace;
        color: white;
        user-select: none;
        display: grid;
        place-items: center;
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
