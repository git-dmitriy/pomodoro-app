import { DefaultTheme } from 'styled-components';

export const baseTheme: DefaultTheme = {
    colors: {
        focus: '#bc4b51',
        break: '#5b8e7d',
        rest: '#8cb369',
        standby: '#22333b',
    },
    media: {
        xs: '(min-width:375px)',
        sm: '(min-width: 640px)',
        md: '(min-width: 768px)',
        lg: '(min-width: 1024px)',
        xl: '(min-width: 1280px)',
        '2xl': '(min-width: 1536px)',
    },
};
