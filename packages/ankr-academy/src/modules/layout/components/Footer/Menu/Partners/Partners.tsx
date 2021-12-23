import React from 'react';
import { uid } from 'react-uid';
import classNames from 'classnames';
import { Link, Typography } from '@material-ui/core';

import { ReactComponent as Coin } from './assets/market.svg';
import { ReactComponent as Gecko } from './assets/gecko.svg';
import { ReactComponent as Blockfolio } from './assets/blockfolio.svg';
import { ReactComponent as CryptoComIcon } from './assets/crypto.svg';

import { t, tHTML } from 'modules/i18n/utils/intl';
import { SOCIAL_LINK } from '../../links';
import { usePartnersStyles } from './PartnersStyles';

const PARTNERS = [
  {
    link: SOCIAL_LINK.coinMarketCap,
    title: 'partners.coinMarketCap',
    icon: <Coin />,
  },
  {
    link: SOCIAL_LINK.coinGecko,
    title: 'partners.coinGecko',
    icon: <Gecko />,
  },
  {
    link: SOCIAL_LINK.blockfolio,
    title: 'partners.blockfolio',
    icon: <Blockfolio />,
  },
  {
    link: SOCIAL_LINK.crypto,
    title: 'partners.crypto',
    icon: <CryptoComIcon />,
  },
];

interface IPartnersProps {
  className?: string;
}

export const Partners = ({ className }: IPartnersProps) => {
  const classes = usePartnersStyles();

  return (
    <div className={classNames(classes.coinWrapper, className)}>
      <Typography className={classes.title} variant="body1">
        {tHTML('footer.find-on')}
      </Typography>
      <div className={classes.links}>
        {PARTNERS.map(partner => (
          <Link
            key={uid(partner)}
            className={classes.coin}
            href={partner.link}
            title={t(partner.title)}
            target="_blank"
            aria-label={t(partner.title)}
          >
            {partner.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};
