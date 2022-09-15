import { Log } from '../../types';
import { iconsMap, prefixesMap } from './const';
import { stringify } from './utils/stringify';
import { useMessageStyles } from './MessageStyles';

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

  return (
    <div className={classes.message}>
      {icon}
      <div className={classes.body}>
        {message}
        {dataElement}
      </div>
    </div>
  );
};
