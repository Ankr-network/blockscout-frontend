import { Box } from '@material-ui/core';
import { Story } from '@storybook/react';

import { Container } from 'uiKit/Container';

import { IUpgradeInfoProps, UpgradeInfo } from './UpgradeInfo';

export default {
  title: 'modules/stake-ankr/UpgradeInfo',
  component: UpgradeInfo,
  argTypes: { onClick: { action: 'clicked' } },
};

const Template: Story<IUpgradeInfoProps> = args => {
  return (
    <Box py={6}>
      <Container maxWidth={680}>
        <UpgradeInfo {...args} />
      </Container>
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  isLoading: false,
};
