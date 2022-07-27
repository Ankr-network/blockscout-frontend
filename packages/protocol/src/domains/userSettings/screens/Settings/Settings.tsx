import { t } from 'common';
import { AddEmailBanner } from 'domains/userSettings/components/AddEmailBanner';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { ConnectWalletCard } from 'domains/userSettings/components/ConnectWalletCard';
import { UserSettingsRoutesConfig } from 'domains/userSettings/Routes';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { Spinner } from 'ui';
import { EmailBlock } from './components/EmailBlock';
import { NotificationsBlock } from '../components/NotificationsBlock';
import { SettingsContentState } from './types';
import { useSettings } from './useSettings';

export const Settings = () => {
  useSetBreadcrumbs([
    {
      title: t(UserSettingsRoutesConfig.settings.breadcrumbs),
    },
  ]);

  const {
    confirmedEmail,
    contentState,
    addEmailBannerContentState,
    initialSubmittedData,
  } = useSettings();

  switch (contentState) {
    case SettingsContentState.LOADING:
      return <Spinner />;

    case SettingsContentState.CONNECT_WALLET:
      return (
        <CenterContainer>
          <ConnectWalletCard />
        </CenterContainer>
      );

    case SettingsContentState.ADD_EMAIL_FORM:
    case SettingsContentState.ADD_EMAIL_SUCCESS:
    case SettingsContentState.LINK_EXPIRED:
      return (
        <CenterContainer>
          <AddEmailBanner
            asCard
            initialContentState={addEmailBannerContentState}
            initialSubmittedData={initialSubmittedData}
          />
        </CenterContainer>
      );

    case SettingsContentState.SETTINGS:
      return (
        <>
          <EmailBlock email={confirmedEmail} />
          <NotificationsBlock />
        </>
      );

    case SettingsContentState.DEFAULT:
    default:
      return null;
  }
};
