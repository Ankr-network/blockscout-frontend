import { makeStyles } from 'tss-react/mui';

interface IUseStylesProps {
  isSuccess: boolean;
  width?: number;
}

export const useStyles = makeStyles<IUseStylesProps>()(
  (_theme, props: IUseStylesProps) => ({
    root: {
      pointerEvents: props.isSuccess ? 'none' : 'auto',
      width: props.width,
    },
  }),
);
