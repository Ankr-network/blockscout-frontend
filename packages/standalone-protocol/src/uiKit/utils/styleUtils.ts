import { Theme } from '@material-ui/core';
import { StatusCircleStatus } from 'uiKit/StatusCircle';

export const getStatusColor = (theme: Theme, status?: StatusCircleStatus) => {
  switch (status) {
    case 'success': {
      return theme.palette.success.main;
    }

    case 'warning': {
      return theme.palette.warning.main;
    }

    case 'error': {
      return theme.palette.error.main;
    }

    default: {
      return theme.palette.primary.main;
    }
  }
};
