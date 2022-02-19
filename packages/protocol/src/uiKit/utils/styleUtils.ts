import { BaseStatus } from '../types/status';
import { Theme } from '@material-ui/core';

export const getStatusColor = (
  theme: Theme,
  _status: BaseStatus | keyof typeof BaseStatus = BaseStatus.success,
) => {
  const status = BaseStatus[_status] as BaseStatus;

  switch (status) {
    case BaseStatus.success: {
      return theme.palette.success.main;
    }

    case BaseStatus.warning: {
      return theme.palette.warning.main;
    }

    case BaseStatus.error: {
      return theme.palette.error.main;
    }

    default: {
      return theme.palette.success.main;
    }
  }
};
