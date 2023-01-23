import { Box } from '@mui/material';

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
  const { classes, cx } = useLoggerStyles();

  return (
    <Box className={cx(className, classes.logger)}>
      <Header onClear={clear} />
      <Console logs={logs} />
    </Box>
  );
};
