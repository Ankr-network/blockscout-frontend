import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { ProjectStatusLabelType } from 'domains/projects/const';

const getBackgroundColor = (type: ProjectStatusLabelType, theme: Theme) => {
  switch (type) {
    case ProjectStatusLabelType.Active:
      return theme.palette.success.light;
    case ProjectStatusLabelType.Frozen:
      // We can't reuse d.ts file in UIKit package
      // @ts-ignore
      return theme.palette.purple.light;
    case ProjectStatusLabelType.Suspended:
      return theme.palette.warning.light;
    default:
      return theme.palette.grey[100];
  }
};

const getColor = (type: ProjectStatusLabelType, theme: Theme) => {
  switch (type) {
    case ProjectStatusLabelType.Active:
      return theme.palette.success.main;
    case ProjectStatusLabelType.Frozen:
      // We can't reuse d.ts file in UIKit package
      // @ts-ignore
      return theme.palette.purple.main;
    case ProjectStatusLabelType.Suspended:
      return theme.palette.warning.main;
    default:
      return theme.palette.grey[600];
  }
};

export const useProjectStatusLabelStyles = makeStyles<ProjectStatusLabelType>()(
  (theme, type) => ({
    root: {
      fontSize: 14,
      lineHeight: 1.4,
      color: getColor(type, theme),
      padding: theme.spacing(0.5, 2),
      backgroundColor: getBackgroundColor(type, theme),
      borderRadius: theme.spacing(2),
    },
  }),
);
