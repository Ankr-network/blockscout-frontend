import { useMemo } from 'react';

import {
  EnterpriseClientJWT,
  selectEnterpriseUserEndpointToken,
} from 'domains/enterprise/store/selectors';
import { UserEndpointDialog } from 'modules/common/components/UserEndpointDialog.tsx';
import { UserEndpointsScrollbarWrapper } from 'modules/common/components/UserEndpointsScrollbar';
import { useAppSelector } from 'store/useAppSelector';
import { useDialog } from 'modules/common/hooks/useDialog';

import { useUserEndpointsWrapperStyles } from './useUserEndpointsWrapperStyles';

interface UserEndpointsWrapperProps {
  apiKeys: EnterpriseClientJWT[];
  className?: string;
  isLoading: boolean;
  onSelectToken?: (index: number) => void;
  openedEndpoint?: EnterpriseClientJWT;
  setOpenedEndpointIndex: (index: number) => void;
}

export const UserEndpointsWrapper = ({
  apiKeys,
  className,
  isLoading,
  onSelectToken = () => {},
  openedEndpoint,
  setOpenedEndpointIndex,
}: UserEndpointsWrapperProps) => {
  const {
    isOpened: isViewEndpointOpened,
    onClose: onEndpointClose,
    onOpen: onEndpointOpen,
  } = useDialog();

  const selectedApiKey = useAppSelector(selectEnterpriseUserEndpointToken);

  const selectedProjectIndex = useMemo(() => {
    if (!selectedApiKey) {
      return -1;
    }

    const currentApiKey = apiKeys.find(
      apiKey => apiKey.enterprise_api_key === selectedApiKey,
    );

    if (!currentApiKey) {
      return -1;
    }

    return currentApiKey.index;
  }, [apiKeys, selectedApiKey]);

  const { classes, cx } = useUserEndpointsWrapperStyles();

  return (
    <div className={cx(classes.userEndpointsWrapperRoot, className)}>
      <UserEndpointsScrollbarWrapper
        jwtTokens={apiKeys}
        selectedProjectIndex={selectedProjectIndex}
        handleSelectTokenIndex={onSelectToken}
        setOpenedProjectIndex={setOpenedEndpointIndex}
        onProjectOpen={onEndpointOpen}
        isLoading={isLoading}
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
