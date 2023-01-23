import { getStatusColor } from '../utils/styleUtils';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
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
      return 12;
    }

    default: {
      return 6;
    }
  }
};

export const useStyles = makeStyles<StatusCircleStylesProps>()(
  (theme: Theme, props: StatusCircleStylesProps) => ({
    root: {
      display: 'inline-block',
      borderRadius: '50%',
      width: getSize(props.size),
      height: getSize(props.size),
      backgroundColor: getStatusColor(theme, props.status),
    },
  }),
);
