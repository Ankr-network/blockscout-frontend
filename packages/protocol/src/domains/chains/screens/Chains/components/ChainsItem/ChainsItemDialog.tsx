import classNames from 'classnames';
import { Box, Typography, Button } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { Dialog } from 'uiKit/Dialog';
import { useChainsItemDialogStyles } from './useChainsItemDialogStyles';

export interface IChainsItemDialogProps {
  name: string;
  logoSrc?: string;
  open: boolean;
  onClose: () => void;
}

export const features = [
  t('chains.premium-features.block1'),
  t('chains.premium-features.block2'),
  t('chains.premium-features.block3'),
  t('chains.premium-features.block4'),
  t('chains.premium-features.block5'),
  t('chains.premium-features.block6'),
  t('chains.premium-features.block7'),
];

const LINK = '/rpc/pricing';

export const ChainsItemDialog = ({
  name,
  open,
  logoSrc,
  onClose,
}: IChainsItemDialogProps): JSX.Element => {
  const classes = useChainsItemDialogStyles();

  return (
    <Dialog
      paperClassName={classes.paperRoot}
      className={classes.root}
      titleClassName={classes.dialogTitle}
      open={open}
      onClose={onClose}
    >
      <Box className={classNames(classes.plan, classes.premium)}>
        <Box className={classes.wrapper}>
          <Box className={classes.container}>
            {logoSrc && <img className={classes.logo} src={logoSrc} alt="" />}
            <Box className={classes.titleWrapper}>
              <Typography className={classes.title} variant="h3" component="p">
                {t('chains.get-premium-access', { name })}
              </Typography>
              <Typography
                className={classes.premiumTitle}
                variant="h3"
                component="p"
              >
                {t('chains.premium-plan')}
              </Typography>
            </Box>
            <div className={classes.plusWrapper}>
              <Box className={classes.plus}>PLUS</Box>
            </div>
            <Box className={classes.features}>
              {features.map((item, index) => {
                return (
                  <Box className={classes.feature} key={index}>
                    <Typography
                      className={classes.featureText}
                      variant="body2"
                      noWrap
                      component="div"
                    >
                      {item}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Button href={LINK}>{t('chains.learn-more-about-premium')}</Button>
        </Box>
      </Box>
    </Dialog>
  );
};
