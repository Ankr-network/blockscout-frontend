import { Typography } from '@mui/material';

import { Locale } from 'modules/i18n';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { Section } from '../Section';
import { Widget } from '../Widget';
import { termsSectionTranslation } from './translation';
import { useTermsSectionStyles } from './useTermsSectionStyles';

type Key = keyof Omit<typeof termsSectionTranslation[Locale.en], 'title'>;

const order: Key[] = [
  'overview',
  'eligibility',
  'rewardsEarning',
  'firstDeposit',
  'rewards',
  'limitations',
  'changes',
  'expiration',
];

export const TermsSection = () => {
  const { classes } = useTermsSectionStyles();
  const { keys, t, tHTML } = useTranslation(termsSectionTranslation);

  return (
    <Section title={t(keys.title)}>
      <Widget>
        <Typography
          className={classes.list}
          color="textSecondary"
          component="ol"
          variant="body4"
        >
          {order.map(key => (
            <li className={classes.listItem} key={key}>
              {t(keys[key].title)}
              {tHTML(keys[key].description)}
            </li>
          ))}
        </Typography>
      </Widget>
    </Section>
  );
};
