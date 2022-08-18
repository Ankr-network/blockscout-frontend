import { useDispatchRequest } from '@redux-requests/react';

import { getEmailBindings } from 'domains/userSettings/actions/email/getEmailBindings';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { makeEmailStatuses } from 'domains/userSettings/utils/makeEmailStatuses';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useLinkParams } from '../../hooks/useLinkParams';
import { ConfirmEmailBindingQuery } from './components/ConfirmEmailBindingQuery';
import { ConnectRelatedWalletCard } from './components/ConnectRelatedWalletCard';
import { LinkExpiredCard } from './components/LinkExpiredCard';
import { useConfirmationBreadcrumbs } from './ConfirmationUtils';

export const ConfirmationQuery = () => {
  useConfirmationBreadcrumbs();

  const dispatchRequest = useDispatchRequest();

  useOnMount(() => {
    dispatchRequest(getEmailBindings());
  });

  const { email, code } = useLinkParams();

  return (
    <Queries<ResponseData<typeof getEmailBindings> | null>
      disableEmptyRender
      disableErrorRender
      requestActions={[getEmailBindings]}
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
