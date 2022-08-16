import { useDispatchRequest } from '@redux-requests/react';

import { getEmailBindings } from 'domains/userSettings/actions/email/getEmailBindings';
import { AddEmailBanner } from 'domains/userSettings/components/AddEmailBanner';
import {
  AddEmailFormContentState,
  AddEmailFormFields,
} from 'domains/userSettings/components/AddEmailForm/types';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { makeEmailStatuses } from 'domains/userSettings/utils/makeEmailStatuses';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { Queries } from 'modules/common/components/Queries/Queries';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { EmailBlock } from './components/EmailBlock';
import { NotificationsBlock } from './components/NotificationsBlock';
import { useSettingsBreadcrumbs } from './SettingsUtils';

export const SettingsQuery = () => {
  useSettingsBreadcrumbs();

  const dispatchRequest = useDispatchRequest();

  useOnMount(() => {
    dispatchRequest(getEmailBindings());
  });

  return (
    <Queries<ResponseData<typeof getEmailBindings> | null>
      disableEmptyRender
      disableErrorRender
      requestActions={[getEmailBindings]}
    >
      {({ data }) => {
        const { confirmedEmail, pendingEmail } = makeEmailStatuses(data);

        if (confirmedEmail) {
          return (
            <>
              <EmailBlock />
              <NotificationsBlock />
            </>
          );
        }

        if (pendingEmail) {
          const initialSubmittedData = {
            [AddEmailFormFields.email]: pendingEmail,
          };

          return (
            <CenterContainer>
              <AddEmailBanner
                asCard
                initialContentState={AddEmailFormContentState.SUCCESS}
                initialSubmittedData={initialSubmittedData}
              />
            </CenterContainer>
          );
        }

        if (!confirmedEmail && !pendingEmail) {
          return (
            <CenterContainer>
              <AddEmailBanner
                asCard
                initialContentState={AddEmailFormContentState.ADD_EMAIL}
              />
            </CenterContainer>
          );
        }

        return null;
      }}
    </Queries>
  );
};
