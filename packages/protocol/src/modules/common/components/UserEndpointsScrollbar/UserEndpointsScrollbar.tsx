import {
  useRef,
  useEffect,
  useCallback,
  ReactNode,
  CSSProperties,
} from 'react';
import Scrollbars from 'react-custom-scrollbars';

import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';

import { useUserEndpointsScrollbarStyles } from './useUserEndpointsScrollbarStyles';

export interface ViewProps {
  // eslint-disable-next-line react/no-unused-prop-types
  style: CSSProperties;
}

interface UserEndpointsScrollbarProps {
  children: ReactNode;
  jwtTokens: JWT[];
}

export const UserEndpointsScrollbar = ({
  children,
  jwtTokens,
}: UserEndpointsScrollbarProps) => {
  const { classes } = useUserEndpointsScrollbarStyles();

  const instance = useRef<Scrollbars>(null);

  useEffect(() => {
    instance.current?.scrollToBottom();
  }, [jwtTokens, children]);

  const renderView = useCallback(
    ({ style }: ViewProps) => (
      <div className={classes.container} style={style} />
    ),
    [classes.container],
  );

  return (
    <Scrollbars ref={instance} renderView={renderView}>
      {children}
    </Scrollbars>
  );
};
