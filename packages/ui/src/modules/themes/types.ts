import { WithStyles } from '@material-ui/styles';
import { ClassNameMap } from '@material-ui/styles/withStyles';

export enum Themes {
  light = 'light',
  dark = 'dark',
}

declare module '@material-ui/core/styles/createBreakpoints' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    HD: true;
    WXGAPlus: true;
    HDPlus: true;
  }
}

// TODO
export type WithUseStyles<
  UseStyles extends (props?: any) => ClassNameMap<string>,
> = WithStyles<{ [key in keyof ReturnType<UseStyles>]?: any }>;
