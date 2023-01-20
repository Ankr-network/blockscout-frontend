import { Box, Button, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { tHTML } from '@ankr.com/common';
import { usePlansStyles } from '../PlansStyles';
import { PremiumLabel } from 'domains/chains/screens/ChainItem/components/GetStartedSection/components/PremiumLabel';

interface PlanProps {
  features: ReactNode[];
  root: string;
  isPremium?: boolean;
  link?: ReactNode;
  href?: string;
}

export const Plan = ({ features, root, isPremium, link, href }: PlanProps) => {
  const { classes, cx } = usePlansStyles();

  return (
    <Box className={cx(classes.plan, isPremium ? classes.premium : '')}>
      <Box className={classes.wrapper}>
        <Box className={classes.container}>
          <Box className={classes.titleWrapper}>
            {isPremium ? (
              <PremiumLabel size="l" className={classes.premiumTitle} />
            ) : (
              <Typography
                className={classes.title}
                variant="h3"
                component="div"
              >
                {tHTML(`${root}.title`)}
              </Typography>
            )}
          </Box>

          <Typography
            className={classes.label}
            variant="h4"
            color={isPremium ? 'textPrimary' : 'textSecondary'}
            component="div"
          >
            {tHTML(`${root}.label`)}
          </Typography>
          <Typography
            className={classes.description}
            variant="body2"
            component="div"
          >
            {tHTML(`${root}.description`)}
            {link && <Box className={classes.link}>{link}</Box>}
          </Typography>
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
        <Button disabled={!isPremium} href={href} className={classes.button}>
          {tHTML(`${root}.button`)}
        </Button>
      </Box>
    </Box>
  );
};
