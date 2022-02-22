import { getStatusColor } from '../utils/styleUtils';
import { makeStyles, Theme } from '@material-ui/core';
import { StatusCircleProps } from './StatusCircleProps';

type StatusCircleStylesProps = {
  size: StatusCircleProps['size'];
  status: StatusCircleProps['status'];
};

const getSize = (size: StatusCircleStylesProps['size']) => {
  switch (size) {
    case 'sm': {
      return 6;
    }

    case 'md': {
      return 10;
    }

    default: {
      return 6;
    }
  }
};

export const useStyles = makeStyles<Theme, StatusCircleStylesProps>(theme => ({
  root: ({ size, status }) => ({
    display: 'inline-block',
    borderRadius: '50%',
    width: getSize(size),
    height: getSize(size),
    backgroundColor: getStatusColor(theme, status),
  }),
}));
