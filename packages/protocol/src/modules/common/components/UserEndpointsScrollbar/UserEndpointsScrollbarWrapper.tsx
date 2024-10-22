import { ReactNode } from 'react';

import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';

import {
  UserEndpointCard,
  UserEndpointCardSkeleton,
} from '../UserEndpointCard';
import { UserEndpointsScrollbar } from './UserEndpointsScrollbar';

export const UserEndpointsScrollbarWrapper = ({
  children,
  handleSelectTokenIndex,
  isLoading,
  jwtTokens,
  onProjectOpen,
  selectedProjectIndex,
  setOpenedProjectIndex,
}: {
  jwtTokens: JWT[];
  selectedProjectIndex: number;
  handleSelectTokenIndex: (newIndex: number) => void;
  setOpenedProjectIndex: (newIndex: number) => void;
  onProjectOpen: () => void;
  children?: ReactNode;
  isLoading?: boolean;
}) => {
  return (
    <UserEndpointsScrollbar jwtTokens={jwtTokens}>
      {isLoading ? (
        <UserEndpointCardSkeleton />
      ) : (
        jwtTokens.map(token => {
          const { index, name, userEndpointToken } = token;

          return (
            <UserEndpointCard
              key={index}
              isSelected={index === selectedProjectIndex}
              tokenIndex={index}
              name={name}
              userEndpointToken={userEndpointToken}
              onProjectSelect={() => handleSelectTokenIndex(index)}
              onProjectView={() => {
                setOpenedProjectIndex(index);
                onProjectOpen();
              }}
            />
          );
        })
      )}
      {children}
    </UserEndpointsScrollbar>
  );
};
