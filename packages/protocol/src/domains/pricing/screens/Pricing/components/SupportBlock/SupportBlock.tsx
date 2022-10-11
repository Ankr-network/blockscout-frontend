import { Box, Button, Typography } from '@material-ui/core';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { ReactComponent as DiscordIcon } from 'uiKit/Icons/discord.svg';

import { useSupportBlockStyles } from './SupportBlockStyles';

interface SupportBlockProps {
  isMobile?: boolean;
}

export const SupportBlock = ({ isMobile }: SupportBlockProps) => {
  const classes = useSupportBlockStyles();

  return (
    <Box mt={isMobile ? 7.5 : 5} className={classes.contactBlock}>
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
        startIcon={<DiscordIcon />}
      >
        {t('plan.contact-discord')}
      </Button>
    </Box>
  );
};
