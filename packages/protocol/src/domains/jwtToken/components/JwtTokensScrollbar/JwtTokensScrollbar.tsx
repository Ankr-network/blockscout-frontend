import { useRef, useEffect, useCallback } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { AddProject } from '../AddProject';
import { Card } from '../Card';
import { useJwtTokenManagerStyles } from '../JwtTokenManager/useJwtTokenManagerStyles';

export interface ViewProps {
  style: React.CSSProperties;
}

interface IJwtTokensProps {
  enableAddProject: boolean;
  jwtTokens: JwtManagerToken[];
  selectedTokenIndex: number;
  setViewTokenIndex: (index: number) => void;
  onOpenViewProject: () => void;
  onOpen: () => void;
  handleTokenIndexSelect: (index: number) => void;
}

export const JwtTokensScrollbar = ({
  enableAddProject,
  jwtTokens,
  selectedTokenIndex,
  setViewTokenIndex,
  onOpenViewProject,
  onOpen,
  handleTokenIndexSelect,
}: IJwtTokensProps) => {
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
      {jwtTokens.map(token => {
        const { index: jwtTokenIndex, userEndpointToken } = token;

        return (
          <Card
            key={jwtTokenIndex}
            isSelected={jwtTokenIndex === selectedTokenIndex}
            tokenIndex={jwtTokenIndex}
            setViewTokenIndex={setViewTokenIndex}
            userEndpointToken={userEndpointToken}
            setSelectedIndex={handleTokenIndexSelect}
            onOpenViewProject={onOpenViewProject}
          />
        );
      })}
      {enableAddProject && (
        <GuardUserGroup blockName={BlockWithPermission.JwtManager}>
          <AddProject onOpen={onOpen} />
        </GuardUserGroup>
      )}
    </Scrollbars>
  );
};
