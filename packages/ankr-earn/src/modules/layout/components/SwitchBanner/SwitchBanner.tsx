import { Typography } from '@material-ui/core';

import { t } from 'common';

import { Container } from 'uiKit/Container';
import { CloseIcon } from 'uiKit/Icons/CloseIcon';
import { NavLink } from 'uiKit/NavLink';

import switchIcon from './assets/switch.png';
import { useSwitchBannerStyles } from './useSwitchBannerStyles';

interface ISwitchBannerProps {
  link: string;
  onClose: () => void;
}

export const SwitchBanner = ({
  link,
  onClose,
}: ISwitchBannerProps): JSX.Element => {
  const classes = useSwitchBannerStyles();

  return (
    <Container className={classes.root} maxWidth="none">
      <img
        alt={t('switch-banner.img-alt')}
        className={classes.image}
        loading="lazy"
        src={switchIcon}
      />

      <Typography className={classes.text}>
        {t('switch-banner.text')}
      </Typography>

      <NavLink
        className={classes.btn}
        href={link}
        size="small"
        variant="contained"
      >
        {t('switch-banner.btn')}
      </NavLink>

      <button className={classes.closeWrapper} type="button" onClick={onClose}>
        <CloseIcon htmlColor="currentColor" size="xxs" />
      </button>
    </Container>
  );
};
