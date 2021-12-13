import { Box, Container } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { t } from 'modules/i18n/utils/intl';
import { HeaderComponent } from '.';

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
        <HeaderComponent
          footnote={t('trading-cockpit.header.aethb-info')}
          footnoteLink="#"
          formSlot={formPlaceholder}
          fairValueSlot={fairValuePlaceholder}
        />
      </Container>
    </section>
  );
};
