import { useRef, useEffect, useCallback, ReactNode } from 'react';
import Scrollbars from 'react-custom-scrollbars';

import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { useJwtTokenManagerStyles } from '../JwtTokenManager/useJwtTokenManagerStyles';

export interface ViewProps {
  style: React.CSSProperties;
}

interface JwtTokensScrollbarProps {
  children: ReactNode;
  jwtTokens: JwtManagerToken[];
}

export const JwtTokensScrollbar = ({
  jwtTokens,
  children,
}: JwtTokensScrollbarProps) => {
  const { classes } = useJwtTokenManagerStyles();

  const instance = useRef<Scrollbars>(null);

  useEffect(() => {
    instance.current?.scrollToBottom();
  }, [jwtTokens]);

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
