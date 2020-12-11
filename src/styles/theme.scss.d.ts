
declare interface Theme {
    primary: string;
    secondary: string;
    light: string;
    accent: string;
    dark: string;
    grey: string;
    positive: string;
    negative: string;
    info: string;
    warning: string;
    bgcolor: string;
}

declare const theme: Theme;

export default theme;
export { Theme };
