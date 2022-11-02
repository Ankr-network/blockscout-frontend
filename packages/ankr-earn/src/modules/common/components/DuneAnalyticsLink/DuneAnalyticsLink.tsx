import { t } from 'common';

import { NavLink } from 'uiKit/NavLink';

import { ReactComponent as DuneIcon } from './assets/DuneIcon.svg';
import { useDuneAnalyticsLinkStyles } from './useDuneAnalyticsLinkStyles';

interface IDuneAnalyticsLinkProps {
  link: string;
}

export const DuneAnalyticsLink = ({
  link,
}: IDuneAnalyticsLinkProps): JSX.Element => {
  const classes = useDuneAnalyticsLinkStyles();

  return (
    <div className={classes.analyticsWrapper}>
      <NavLink
        className={classes.link}
        color="secondary"
        href={link}
        variant="inline-text"
      >
        <DuneIcon className={classes.icon} />

        {t('stake.stats.dune-analytics')}
      </NavLink>
    </div>
  );
};
