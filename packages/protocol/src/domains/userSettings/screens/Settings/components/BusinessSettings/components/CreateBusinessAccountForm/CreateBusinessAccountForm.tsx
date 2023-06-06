import { useCallback } from 'react';

import {
  HubspotWidget,
  updateFormValue,
} from 'modules/common/components/HubspotWidget';
import { timeout } from 'modules/common/utils/timeout';

interface CreateBusinessAccountFormProps {
  onSubmit: () => void;
  email?: string;
}

const FORM_ID = 'f47e1786-1426-44b2-b541-c4fe963a70f6';
const BUSINESS_OWNER_EMAIL_SELECTOR = 'input[value="default@email.com"]';
const PORTAL_ID = '25013502';

export const CreateBusinessAccountForm = ({
  onSubmit,
  email,
}: CreateBusinessAccountFormProps) => {
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
