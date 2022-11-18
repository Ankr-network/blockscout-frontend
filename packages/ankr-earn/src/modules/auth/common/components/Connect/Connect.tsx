import { t } from '@ankr.com/common';
import { Paper, Typography } from '@material-ui/core';

import { Button } from 'uiKit/Button';
import { Container } from 'uiKit/Container';

import connectWalletIcon from '../../assets/connect-wallet-icon.jpg';
import connectWalletIcon2x from '../../assets/connect-wallet-icon@2x.jpg';

import { useConnectStyles } from './useConnectStyles';

interface IConnectProps {
  onConnectClick?: () => void;
}

export const Connect = ({ onConnectClick }: IConnectProps): JSX.Element => {
  const classes = useConnectStyles();

  return (
    <Container>
      <Paper className={classes.root}>
        <div className={classes.imgArea}>
          <img
            alt={t('connect.title')}
            className={classes.img}
            src={connectWalletIcon}
            srcSet={`${connectWalletIcon2x} 2x`}
          />
        </div>

        <Typography className={classes.titleArea} variant="h3">
          {t('connect.title')}
        </Typography>

        <Button onClick={onConnectClick}>{t('connect.connect-wallet')}</Button>
      </Paper>
    </Container>
  );
};
