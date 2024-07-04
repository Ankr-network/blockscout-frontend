import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { ProjectStatusLabelType } from 'domains/projects/const';
import { isLightTheme } from 'uiKit/Theme/themeUtils';
import { COLOR_PURPLE } from 'uiKit/Theme/const';

const getBackgroundColor = (type: ProjectStatusLabelType, theme: Theme) => {
  switch (type) {
    case ProjectStatusLabelType.Active:
      return isLightTheme(theme) ? '#3AC090' : '#4BC99B';
    case ProjectStatusLabelType.Frozen:
      return isLightTheme(theme) ? COLOR_PURPLE : '#B967E2';
    case ProjectStatusLabelType.Suspended:
      return isLightTheme(theme) ? '#EEA941' : '#F0B358';
    default:
      return theme.palette.grey[600];
  }
};

export const useProjectStatusLabelStyles = makeStyles<ProjectStatusLabelType>()(
  (theme, type) => ({
    projectStatusLabel: {
      fontSize: 14,
      fontWeight: 500,
      color: 'white',
      padding: theme.spacing(1, 2),
      backgroundColor: getBackgroundColor(type, theme),
      borderRadius: theme.spacing(2),
      whiteSpace: 'nowrap',
    },
  }),
);
