import { Box, Button, Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';
import { PremiumChainDialog } from 'domains/chains/components/PremiumChainDialog';
import { ContentType } from 'domains/chains/components/PremiumChainDialog/types';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useEnterpriseBlockStyles } from './useEnterpriseBlockStyles';

export const EnterpriseBlock = () => {
  const { isOpened, onOpen, onClose } = useDialog();
  const { classes } = useEnterpriseBlockStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Typography
          className={classes.label}
          variant="h4"
          color="textSecondary"
        >
          {tHTML('plan.enterprise-block.label')}
        </Typography>
        <Typography variant="h3" className={classes.title}>
          {tHTML('plan.enterprise-block.title')}
        </Typography>
      </Box>
      <Button
        className={classes.link}
        color="primary"
        variant="text"
        onClick={onOpen}
      >
        {t('plan.enterprise-block.link')}
      </Button>
      <PremiumChainDialog
        onClose={onClose}
        open={isOpened}
        defaultState={ContentType.CONTACT_SALES_FORM}
      />
    </Box>
  );
};
