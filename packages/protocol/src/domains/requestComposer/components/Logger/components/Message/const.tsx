import { CSSProperties, ReactNode } from 'react';

import { MessageType } from '../../types';
import { Dot, Mark, CircleCheck, Clock, ArrowRightBig } from '@ankr.com/ui';
import { root } from '../../const';
import { t } from '@ankr.com/common';

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

const prefixes = `${root}.prefixes`;

export const prefixesMap: Record<MessageType, string> = {
  [Error]: t(`${prefixes}.error`),
  [Info]: '',
  [Input]: '',
  [Success]: t(`${prefixes}.success`),
  [Time]: t(`${prefixes}.time`),
};
