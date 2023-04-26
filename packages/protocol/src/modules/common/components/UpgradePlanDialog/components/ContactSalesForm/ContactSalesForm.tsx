import { HubspotWidget } from 'modules/common/components/HubspotWidget';

interface ContactSalesFormProps {
  onSubmit: () => void;
}

export const ContactSalesForm = ({ onSubmit }: ContactSalesFormProps) => {
  return (
    <HubspotWidget
      portalId="25013502"
      formId="de33113f-1826-4514-acf1-c70add2af899"
      loading={<div>Loading...</div>}
      onFormSubmitted={onSubmit}
    />
  );
};
