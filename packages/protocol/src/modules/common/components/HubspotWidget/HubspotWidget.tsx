import { ComponentProps } from 'react';
import HubspotForm from 'react-hubspot-form';

import { loadJquery } from 'modules/common';

type HubspotWidgetProps = ComponentProps<typeof HubspotForm> & {
  onSubmit: () => void;
};

export const HubspotWidget = (props: HubspotWidgetProps) => {
  return (
    <HubspotForm
      {...props}
      // form needs jquery for submit action
      onReady={loadJquery}
      onSubmit={() => {}}
    />
  );
};
