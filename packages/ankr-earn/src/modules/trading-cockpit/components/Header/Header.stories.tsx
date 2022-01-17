import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Container } from 'uiKit/Container';
import { Header } from '.';

export default {
  title: 'modules/TradingCockpit/components/Header',
};

export const Default = () => {
  const formPlaceholder = (
    <Box maxWidth={580}>
      <Skeleton width="100%" height={60} variant="rect" />
    </Box>
  );

  const fairValuePlaceholder = (
    <Skeleton width={140} height={60} variant="rect" />
  );

  return (
    <section>
      <Container>
        <Header
          formSlot={formPlaceholder}
          fairValueSlot={fairValuePlaceholder}
        />
      </Container>
    </section>
  );
};
