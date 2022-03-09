import { makeStyles, Theme } from '@material-ui/core';

export interface IUseStakeDescriptionValueStylesProps {
  isBold?: boolean;
}

export const useStakeDescriptionValueStyles = makeStyles<
  Theme,
  IUseStakeDescriptionValueStylesProps
>(() => ({
  root: {
    fontWeight: ({ isBold }) => (isBold ? 'bold' : 'normal'),

    alignItems: 'center',
    display: 'flex',

    '&&': {
      justifySelf: 'end',
      alignSelf: 'center',
      fontSize: 16,
      textAlign: 'right',
    },
  },
}));
