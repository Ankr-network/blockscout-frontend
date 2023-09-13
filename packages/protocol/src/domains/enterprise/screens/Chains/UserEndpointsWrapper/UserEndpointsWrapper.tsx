import { useMemo } from 'react';

import { UserEndpointsScrollbarWrapper } from 'modules/common/components/UserEndpointsScrollbar';
import { UserEndpointDialog } from 'modules/common/components/UserEndpointDialog.tsx';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useAppSelector } from 'store/useAppSelector';
import {
  EnterpriseClientJwtManagerItem,
  selectEnterpriseUserEndpointToken,
} from 'domains/enterprise/store/selectors';

import { useUserEndpointsWrapperStyles } from './useUserEndpointsWrapperStyles';

interface UserEndpointsWrapperProps {
  className?: string;
  onSelectToken?: (index: number) => void;
  apiKeys: EnterpriseClientJwtManagerItem[];
  isLoading: boolean;
  openedEndpoint?: EnterpriseClientJwtManagerItem;
  setOpenedEndpointIndex: (index: number) => void;
}

export const UserEndpointsWrapper = ({
  className,
  onSelectToken = () => {},
  apiKeys,
  isLoading,
  openedEndpoint,
  setOpenedEndpointIndex,
}: UserEndpointsWrapperProps) => {
  const {
    isOpened: isViewEndpointOpened,
    onOpen: onEndpointOpen,
    onClose: onEndpointClose,
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
