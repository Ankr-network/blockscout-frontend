import { t } from 'common';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { ConnectWalletCard } from 'domains/userSettings/components/ConnectWalletCard';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { Spinner } from 'ui';
import { ConnectRelatedWalletCard } from './components/ConnectRelatedWalletCard';
import { LinkExpiredCard } from './components/LinkExpiredCard';
import { ConfirmationContentState } from './types';
import { useConfirmation } from './useConfirmation';

export const Confirmation = () => {
  useSetBreadcrumbs([
    {
      title: t(UserSettingsRoutesConfig.confirmation.breadcrumbs),
    },
  ]);

  const { contentState } = useConfirmation();

  switch (contentState) {
    case ConfirmationContentState.LOADING:
      return <Spinner />;

    case ConfirmationContentState.CONNECT_WALLET:
      return (
        <CenterContainer>
          <ConnectWalletCard />
        </CenterContainer>
      );

    case ConfirmationContentState.CONNECT_RELATED_WALLET:
      return (
        <CenterContainer>
          <ConnectRelatedWalletCard />
        </CenterContainer>
      );

    case ConfirmationContentState.LINK_EXPIRED:
      return (
        <CenterContainer>
          <LinkExpiredCard />
        </CenterContainer>
      );

    case ConfirmationContentState.DEFAULT:
    default:
      return null;
  }
};
