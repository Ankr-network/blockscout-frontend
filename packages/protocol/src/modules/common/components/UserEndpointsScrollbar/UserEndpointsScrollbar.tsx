import { useRef, useEffect, useCallback, ReactNode } from 'react';
import Scrollbars from 'react-custom-scrollbars';

import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { useUserEndpointsScrollbarStyles } from './useUserEndpointsScrollbarStyles';

export interface ViewProps {
  style: React.CSSProperties;
}

interface UserEndpointsScrollbarProps {
  children: ReactNode;
  jwtTokens: JwtManagerToken[];
}

export const UserEndpointsScrollbar = ({
  jwtTokens,
  children,
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
