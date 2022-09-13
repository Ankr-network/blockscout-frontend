import { CSSProperties, ReactNode } from 'react';

import { MessageType } from '../../types';
import { ReactComponent as ErrorIcon } from './assets/error.svg';
import { ReactComponent as InfoIcon } from './assets/info.svg';
import { ReactComponent as InputIcon } from './assets/input.svg';
import { ReactComponent as SuccessIcon } from './assets/success.svg';
import { ReactComponent as TimeIcon } from './assets/time.svg';
import { root } from '../../const';
import { t } from 'modules/i18n/utils/intl';

const { Error, Info, Input, Success, Time } = MessageType;

const style: CSSProperties = {
  flexShrink: 0,
};

export const iconsMap: Record<MessageType, ReactNode> = {
  [Error]: <ErrorIcon style={style} />,
  [Info]: <InfoIcon style={style} />,
  [Input]: <InputIcon style={style} />,
  [Success]: <SuccessIcon style={style} />,
  [Time]: <TimeIcon style={style} />,
};

const prefixes = `${root}.prefixes`;

export const prefixesMap: Record<MessageType, string> = {
  [Error]: t(`${prefixes}.error`),
  [Info]: '',
  [Input]: '',
  [Success]: t(`${prefixes}.success`),
  [Time]: t(`${prefixes}.time`),
};
