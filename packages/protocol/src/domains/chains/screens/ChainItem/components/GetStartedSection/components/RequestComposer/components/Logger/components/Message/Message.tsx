import { Log } from '../../types';
import { iconsMap, prefixesMap } from './const';
import { MAX_MESSAGE_LENGTH, stringify } from './utils/stringify';
import { useMessageStyles } from './MessageStyles';
import { useMemo } from 'react';

export interface MessageProps {
  message: Log;
}

export const Message = ({ message: { data = '', type } }: MessageProps) => {
  const classes = useMessageStyles(type);

  const icon = iconsMap[type];
  const prefix = prefixesMap[type];

  const isObject = typeof data === 'object';
  const [message, dataElement] = isObject
    ? [prefix, <div className={classes.data}>{stringify(data)}</div>]
    : [`${prefix}${data}`, null];

  const dispayMessage = useMemo(() => {
    const list = [];
    const len = Math.ceil(message.length / MAX_MESSAGE_LENGTH);

    for (let i = 0; i < len; i++) {
      list.push(
        message.substring(i * MAX_MESSAGE_LENGTH, (i + 1) * MAX_MESSAGE_LENGTH),
      );
    }

    return list.map((msg: string) => <span>{msg}</span>);
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
