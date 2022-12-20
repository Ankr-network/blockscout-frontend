import { IEmailResponse } from 'multirpc-sdk';

import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { ConfirmEmailBindingQuery } from './components/ConfirmEmailBindingQuery';
import { ConnectRelatedWalletCard } from './components/ConnectRelatedWalletCard';
import { LinkExpiredCard } from './components/LinkExpiredCard';
import { Queries } from 'modules/common/components/Queries/Queries';
import { makeEmailStatuses } from 'domains/userSettings/utils/makeEmailStatuses';
import { useConfirmationBreadcrumbs } from './ConfirmationUtils';
import { useLazyUserSettingsGetEmailBindingsQuery } from 'domains/userSettings/actions/email/getEmailBindings';
import { useLinkParams } from '../../hooks/useLinkParams';
import { useOnMount } from 'modules/common/hooks/useOnMount';

export const ConfirmationQuery = () => {
  useConfirmationBreadcrumbs();

  const [getEmailBindings, emailBindingsState] =
    useLazyUserSettingsGetEmailBindingsQuery();

  useOnMount(() => {
    getEmailBindings(undefined);
  });

  const { email, code } = useLinkParams();

  return (
    <Queries<IEmailResponse[]>
      disableEmptyRender
      disableErrorRender
      queryStates={[emailBindingsState]}
    >
      {({ data }) => {
        const { lastEmailUsed, pendingEmail, isEmailLinkExpired } =
          makeEmailStatuses(data);

        if (lastEmailUsed !== email || !pendingEmail) {
          return (
            <CenterContainer>
              <ConnectRelatedWalletCard />
            </CenterContainer>
          );
        }

        if (isEmailLinkExpired) {
          return (
            <CenterContainer>
              <LinkExpiredCard />
            </CenterContainer>
          );
        }

        if (email && code && pendingEmail === email) {
          return <ConfirmEmailBindingQuery email={email} code={code} />;
        }

        return null;
      }}
    </Queries>
  );
};
