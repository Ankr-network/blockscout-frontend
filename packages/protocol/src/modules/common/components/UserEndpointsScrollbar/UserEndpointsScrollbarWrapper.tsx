import { ReactNode } from 'react';

import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';

import { UserEndpointCard } from '../UserEndpointCard';
import { UserEndpointsScrollbar } from './UserEndpointsScrollbar';

export const UserEndpointsScrollbarWrapper = ({
  jwtTokens,
  selectedProjectIndex,
  handleSelectTokenIndex,
  setOpenedProjectIndex,
  onProjectOpen,
  children,
}: {
  jwtTokens: JwtManagerToken[];
  selectedProjectIndex: number;
  handleSelectTokenIndex: (newIndex: number) => void;
  setOpenedProjectIndex: (newIndex: number) => void;
  onProjectOpen: () => void;
  children?: ReactNode;
}) => {
  return (
    <UserEndpointsScrollbar jwtTokens={jwtTokens}>
      {jwtTokens.map(token => {
        const { index, userEndpointToken } = token;

        return (
          <UserEndpointCard
            key={index}
            isSelected={index === selectedProjectIndex}
            tokenIndex={index}
            userEndpointToken={userEndpointToken}
            onProjectSelect={() => handleSelectTokenIndex(index)}
            onProjectView={() => {
              setOpenedProjectIndex(index);
              onProjectOpen();
            }}
          />
        );
      })}
      {children}
    </UserEndpointsScrollbar>
  );
};
