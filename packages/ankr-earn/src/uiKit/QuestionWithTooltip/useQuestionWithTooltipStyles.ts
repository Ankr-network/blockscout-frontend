import { makeStyles, Theme } from '@material-ui/core';

interface IUseQuestionWithTooltipStylesProps {
  marginLeft: number;
}

export const useQuestionWithTooltipStyles = makeStyles<
  Theme,
  IUseQuestionWithTooltipStylesProps
>(theme => ({
  btn: {
    marginLeft: ({ marginLeft }) => theme.spacing(marginLeft),
    cursor: 'help',
    color: theme.palette.text.secondary,
  },

  icon: {
    display: 'block',
  },
}));
