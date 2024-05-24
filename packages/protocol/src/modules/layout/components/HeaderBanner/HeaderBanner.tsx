import { Typography } from '@mui/material';

import { useDialog } from 'modules/common/hooks/useDialog';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { MaintenanceDialog } from '../MaintenanceDialog';
import { useHeaderBannerStyles } from './useHeaderBannerStyles';
import { bannerTranslation } from './translation';

export const HeaderBanner = () => {
  const { classes } = useHeaderBannerStyles();

  const { tHTML, keys } = useTranslation(bannerTranslation);

  const { isOpened, onClose, onOpen } = useDialog();

  useOnMount(() => {
    const element = document.getElementById('learn-more');

    if (element) {
      element.onclick = onOpen;
    }
  });

  return (
    <>
      <div className={classes.root}>
        <Typography variant="body3" className={classes.text}>
          {tHTML(keys.text)}
        </Typography>
      </div>

      <MaintenanceDialog isOpened={isOpened} onClose={onClose} />
    </>
  );
};
