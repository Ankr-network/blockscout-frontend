import { EndpointGroup } from 'modules/endpoints/types';
import { RequestComposer } from 'domains/requestComposer/components/composers';

import { LearnMore } from './components/LearnMore';
import { useDebugMenuSectionStyles } from './DebugMenusSectionStyles';

export interface DebugMenuSectionProps {
  chainId: string;
  group: EndpointGroup;
  publicUrl: string;
}

export const DebugMenuSection = ({
  chainId,
  group,
  publicUrl,
}: DebugMenuSectionProps) => {
  const { classes } = useDebugMenuSectionStyles();

  return (
    <div className={classes.root}>
      <RequestComposer
        chainId={chainId}
        group={group}
        hasBlockNumber={false}
        hasRequestHistory
        hasTitle={false}
        publicUrl={publicUrl}
      />
      <LearnMore />
    </div>
  );
};
