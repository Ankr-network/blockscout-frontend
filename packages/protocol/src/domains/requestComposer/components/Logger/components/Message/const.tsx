import { CSSProperties, ReactNode } from 'react';
import { Dot, Mark, CircleCheck, Clock, ArrowRightBig } from '@ankr.com/ui';

import { MessageType } from '../../types';

const { Error, Info, Input, Success, Time } = MessageType;

const style: CSSProperties = {
  flexShrink: 0,
  fontSize: 16,
};

export const iconsMap: Record<MessageType, ReactNode> = {
  [Error]: <Mark className="message-icon" style={style} />,
  [Info]: <Dot className="message-icon" style={style} />,
  [Input]: <ArrowRightBig className="message-icon" style={style} />,
  [Success]: <CircleCheck className="message-icon" style={style} />,
  [Time]: <Clock className="message-icon" style={style} />,
};
