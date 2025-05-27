import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            focus: string;
            break: string;
            rest: string;
            standby: string;
        };
        media: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
            '2xl': string;
        };
    }
}