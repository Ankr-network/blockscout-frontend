import { Typography } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { Container } from 'uiKit/Container';
import { CloseIcon } from 'uiKit/Icons/CloseIcon';
import { NavLink } from 'uiKit/NavLink';
import switchImg from './assets/switch.png';
import { useSwitchBannerStyles } from './useSwitchBannerStyles';

interface ISwitchBannerProps {
  link: string;
  onClose: () => void;
}

export const SwitchBanner = ({ link, onClose }: ISwitchBannerProps) => {
  const classes = useSwitchBannerStyles();

  return (
    <Container maxWidth="none" className={classes.root}>
      <img
        src={switchImg}
        className={classes.image}
        alt={t('switch-banner.img-alt')}
        loading="lazy"
      />

      <Typography className={classes.text}>
        {t('switch-banner.text')}
      </Typography>

      <NavLink
        href={link}
        size="small"
        variant="contained"
        className={classes.btn}
      >
        {t('switch-banner.btn')}
      </NavLink>

      <button className={classes.closeWrapper} type="button" onClick={onClose}>
        <CloseIcon size="xxs" htmlColor="currentColor" />
      </button>
    </Container>
  );
};
