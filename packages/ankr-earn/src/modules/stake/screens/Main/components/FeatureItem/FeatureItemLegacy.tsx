import { Chip, Grid } from '@material-ui/core';

import { t } from 'common';

import { NavLink } from 'uiKit/NavLink';

import { FeatureItemBase } from './FeatureItemBase';
import { useFeatureItemStyles } from './useFeatureItemStyles';

interface IFeatureItemLegacyProps {
  title: string;
  href: string;
  iconSlot: JSX.Element;
}

export const FeatureItemLegacy = ({
  title,
  href,
  iconSlot,
}: IFeatureItemLegacyProps): JSX.Element => {
  const classes = useFeatureItemStyles();

  return (
    <FeatureItemBase
      withAnimations
      buttonsSlot={
        <NavLink
          className={classes.button}
          color="primary"
          href={href}
          variant="outlined"
        >
          {t('features.stake-old')}
        </NavLink>
      }
      iconSlot={iconSlot}
      statsSlot={
        <Grid container spacing={1}>
          <Grid item>
            <Chip
              disabled
              label={t('features.chips.coming-soon')}
              size="small"
            />
          </Grid>

          <Grid item>
            <Chip
              disabled
              label={t('features.chips.old-version')}
              size="small"
            />
          </Grid>
        </Grid>
      }
      title={title}
    />
  );
};
