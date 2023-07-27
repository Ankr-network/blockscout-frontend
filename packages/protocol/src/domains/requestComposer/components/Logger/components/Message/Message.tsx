import { useMemo } from 'react';

import { Log } from '../../types';
import { iconsMap } from './const';
import { MAX_MESSAGE_LENGTH, stringify } from './utils/stringify';
import { useMessageStyles } from './MessageStyles';
import { getMessage } from './MessageUtils';

export interface MessageProps {
  message: Log;
}

export const Message = ({ message: { data = '', type } }: MessageProps) => {
  const { classes } = useMessageStyles(type);

  const icon = iconsMap[type];
  const status = useMemo(() => getMessage(type), [type]);

  const [message, dataElement] =
    typeof data === 'object'
      ? [
          status,
          <div className={classes.data} key={`${status}${data}`}>
            {stringify(data)}
          </div>,
        ]
      : [`${status}${data}`, null];

  const dispayMessage = useMemo(() => {
    const list = [];
    const len = Math.ceil(message.length / MAX_MESSAGE_LENGTH);

    for (let i = 0; i < len; i++) {
      list.push(
        message.substring(i * MAX_MESSAGE_LENGTH, (i + 1) * MAX_MESSAGE_LENGTH),
      );
    }

    return list.map((msg: string) => (
      <span key={`msg-${msg.substring(0, 20)}`}>{msg}</span>
    ));
  }, [message]);

  return (
    <div className={classes.message}>
      {icon}
      <div className={classes.body}>
        {dispayMessage}
        {dataElement}
      </div>
    </div>
  );
};
