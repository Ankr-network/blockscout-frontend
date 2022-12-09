import { Box } from '@material-ui/core';
import classNames from 'classnames';

import { Console } from './components/Console';
import { Header } from './components/Header';
import { Log } from '../composers/types';
import { useLoggerStyles } from './LoggerStyles';

export interface LoggerProps {
  className?: string;
  clear: () => void;
  logs: Log[];
}

export const Logger = ({ className, clear, logs }: LoggerProps) => {
  const classes = useLoggerStyles();

  return (
    <Box className={classNames(className, classes.logger)}>
      <Header onClear={clear} />
      <Console logs={logs} />
    </Box>
  );
};
