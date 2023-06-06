import { useCallback } from 'react';

import {
  HubspotWidget,
  updateFormValue,
} from 'modules/common/components/HubspotWidget';
import { timeout } from 'modules/common/utils/timeout';

interface InviteUserFormProps {
  onSubmit: () => void;
  email?: string;
}

const PORTAL_ID = '25013502';
const FORM_ID = '1deeeade-8b41-494c-97b6-b68e33f7b7ca';
const BUSINESS_OWNER_EMAIL_SELECTOR = 'input[value="default@email.com"]';

export const InviteUserForm = ({ onSubmit, email }: InviteUserFormProps) => {
  const handleUpdateHiddenFields = useCallback(
    // HubspotForm doesn't have types
    (formApi: any) => {
      try {
        const [form] = formApi;

        updateFormValue(form, BUSINESS_OWNER_EMAIL_SELECTOR, email);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    [email],
  );

  return (
    <HubspotWidget
      portalId={PORTAL_ID}
      formId={FORM_ID}
      loading={<div>Loading...</div>}
      onFormSubmitted={async () => {
        await timeout();
        onSubmit();
      }}
      onBeforeFormSubmit={handleUpdateHiddenFields}
    />
  );
};
