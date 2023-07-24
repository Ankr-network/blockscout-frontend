import Scrollbars from 'react-custom-scrollbars';
import { useCallback, useEffect, useRef, CSSProperties } from 'react';

import { Log } from '../../types';
import { Message } from '../Message';
import { useConsoleStyles } from './ConsoleStyles';

export interface ConsoleProps {
  logs: Log[];
}

export interface ViewProps {
  // eslint-disable-next-line react/no-unused-prop-types
  style: CSSProperties;
}

export const Console = ({ logs }: ConsoleProps) => {
  const instance = useRef<Scrollbars>(null);
  const { classes } = useConsoleStyles();

  const renderView = useCallback(
    ({ style }: ViewProps) => <div className={classes.console} style={style} />,
    [classes.console],
  );

  useEffect(() => {
    instance.current?.scrollToBottom();
  }, [logs]);

  return (
    <Scrollbars ref={instance} renderView={renderView}>
      {logs.map(message => (
        <Message message={message} key={JSON.stringify(message)} />
      ))}
    </Scrollbars>
  );
};
