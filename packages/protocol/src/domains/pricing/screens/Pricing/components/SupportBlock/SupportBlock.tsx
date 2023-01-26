import { Box, Button, Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';
import { Discord } from '@ankr.com/ui';

import { useSupportBlockStyles } from './SupportBlockStyles';

interface SupportBlockProps {
  isMobile?: boolean;
}

export const SupportBlock = ({ isMobile }: SupportBlockProps) => {
  const { classes } = useSupportBlockStyles();

  return (
    <Box mt={isMobile ? 15 : 10} className={classes.contactBlock}>
      <Typography
        className={classes.contactBlockHeader}
        variant="body2"
        align="left"
      >
        {tHTML('plan.more-questions')}
      </Typography>
      <Button
        target="_blank"
        href="https://discord.com/invite/uYaNu23Ww7"
        className={classes.contactBlockBtn}
        startIcon={<Discord />}
      >
        {t('plan.contact-discord')}
      </Button>
    </Box>
  );
};
