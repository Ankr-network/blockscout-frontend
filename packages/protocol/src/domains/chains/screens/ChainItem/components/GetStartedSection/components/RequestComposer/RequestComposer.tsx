import { Box } from '@material-ui/core';

import { Header } from './Header';
import { Menu } from './Menu';
import { Logger } from './Logger';
import { useRequestComposerStyles } from './RequestComposerStyles';
import { useEVMRequestLogger } from './hooks/useEVMRequestLogger';
import { EndpointGroup } from 'modules/endpoints/types';

interface IRequestComposerProps {
  group: EndpointGroup;
  publicUrl: string;
}

export const RequestComposer = ({
  group,
  publicUrl,
}: IRequestComposerProps) => {
  const { clear, logs } = useEVMRequestLogger();

  const classes = useRequestComposerStyles();

  return (
    <Box className={classes.root}>
      <Header publicUrl={publicUrl} />
      <Box className={classes.container}>
        <Menu className={classes.menu} group={group} />
        <Logger className={classes.logs} clear={clear} logs={logs} />
      </Box>
    </Box>
  );
};
