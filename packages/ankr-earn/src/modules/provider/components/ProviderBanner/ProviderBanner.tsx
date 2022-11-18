import { t } from '@ankr.com/common';
import { Grid, Paper, Typography } from '@material-ui/core';

import { Button } from 'uiKit/Button';
import { CloseButton } from 'uiKit/CloseButton';

import providerImg from './assets/provider.png';
import providerImg2x from './assets/provider@2x.png';
import { useProviderBannerStyles } from './useProviderBannerStyles';

const imgSources = {
  desktop: providerImg,
  desktop2x: providerImg2x,
};

interface IProviderBannerProps {
  onDetailsClick?: () => void;
  onCloseClick?: () => void;
}

export const ProviderBanner = ({
  onCloseClick,
  onDetailsClick,
}: IProviderBannerProps): JSX.Element => {
  const classes = useProviderBannerStyles();

  return (
    <Paper className={classes.banner}>
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs="auto">
          <picture className={classes.imgWrap}>
            <source
              srcSet={`${imgSources.desktop}, ${imgSources.desktop2x} 2x`}
            />

            <img
              alt=""
              className={classes.img}
              loading="lazy"
              src={imgSources.desktop}
            />
          </picture>
        </Grid>

        <Grid item xs>
          <Typography className={classes.text} variant="body2">
            {t('provider-info.title')}
          </Typography>
        </Grid>

        <Grid item className={classes.closeCol} xs="auto">
          <CloseButton isAbsoluteRight={false} onClose={onCloseClick} />
        </Grid>

        <Grid item md="auto" xs={12}>
          <Button
            fullWidth
            className={classes.btn}
            size="small"
            onClick={onDetailsClick}
          >
            {t('provider-info.details')}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
