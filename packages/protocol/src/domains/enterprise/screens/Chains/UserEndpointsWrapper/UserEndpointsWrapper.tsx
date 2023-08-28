import { useMemo, useState } from 'react';

import { UserEndpointsScrollbarWrapper } from 'modules/common/components/UserEndpointsScrollbar';
import { UserEndpointDialog } from 'modules/common/components/UserEndpointDialog.tsx';
import { useDialog } from 'modules/common/hooks/useDialog';

import { useUserEndpointsWrapperStyles } from './useUserEndpointsWrapperStyles';

const jwtTokensMock = [
  {
    index: 0,
    userEndpointToken: 'mockedUserEndpointToken-0',
    name: 'project 0',
    description: 'description 0',
    jwtData: '',
  },
  {
    index: 1,
    userEndpointToken: 'mockedUserEndpointToken-1',
    name: 'project 1',
    description: 'description 1',
    jwtData: '',
  },
  {
    index: 2,
    userEndpointToken: 'mockedUserEndpointToken-2',
    name: 'project 2',
    description: 'description 2',
    jwtData: '',
  },
  {
    index: 3,
    userEndpointToken: 'mockedUserEndpointToken-3',
    name: 'project 3',
    description: 'description 3',
    jwtData: '',
  },
  {
    index: 4,
    userEndpointToken: 'mockedUserEndpointToken-4',
    name: 'project 4',
    description: 'description 4',
    jwtData: '',
  },
  {
    index: 5,
    userEndpointToken: 'mockedUserEndpointToken-5',
    name: 'project 5',
    description: 'description 5',
    jwtData: '',
  },
];

export const UserEndpointsWrapper = () => {
  const {
    isOpened: isViewEndpointOpened,
    onOpen: onEndpointOpen,
    onClose: onEndpointClose,
  } = useDialog();

  const [openedEndpointIndex, setOpenedEndpointIndex] = useState(-1);

  const openedEndpoint = useMemo(
    () => jwtTokensMock.find(item => item.index === openedEndpointIndex),
    [openedEndpointIndex],
  );

  const { classes } = useUserEndpointsWrapperStyles();

  return (
    <div className={classes.root}>
      <UserEndpointsScrollbarWrapper
        jwtTokens={jwtTokensMock}
        selectedProjectIndex={-1}
        handleSelectTokenIndex={() => {}}
        setOpenedProjectIndex={setOpenedEndpointIndex}
        onProjectOpen={onEndpointOpen}
      />
      <UserEndpointDialog
        shouldConnectWallet={false}
        endpointToken={openedEndpoint?.userEndpointToken}
        tokenIndex={openedEndpoint?.index}
        name={openedEndpoint?.name}
        isOpened={isViewEndpointOpened}
        onClose={onEndpointClose}
      />
    </div>
  );
};
