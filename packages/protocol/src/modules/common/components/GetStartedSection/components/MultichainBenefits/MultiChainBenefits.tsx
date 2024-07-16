import { Box, Button, Paper, Typography } from '@mui/material';

import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { useBenefitsContent } from './useBenefitsContent';
import { useMultiChainBenefitsStyles } from './useMultiChainBenefitsStyles';

export const MultiChainBenefits = () => {
  const { isLightTheme } = useThemes();
  const { classes } = useMultiChainBenefitsStyles(isLightTheme);
  const { content, keys, t } = useBenefitsContent();

  return (
    <>
      <Typography variant="subtitle1" className={classes.title}>
        {t(keys.title)}
      </Typography>
      <Box className={classes.wrapper}>
        {content.map(
          ({ description, img, linkHref, linkText, list, title }) => {
            return (
              <Paper className={classes.apiWrapper} key={title}>
                <img className={classes.img} src={img} alt="" />

                <div className={classes.mainTextSection}>
                  <Typography className={classes.apiTitle} variant="subtitle2">
                    {title}
                  </Typography>

                  <Typography
                    className={classes.apiDescription}
                    variant="body3"
                    color="textSecondary"
                  >
                    {description}
                  </Typography>
                </div>

                <Box className={classes.apiFeaturesList}>
                  {list.map(item => {
                    return (
                      <code className={classes.apiFeaturesItem} key={item}>
                        {item}
                      </code>
                    );
                  })}
                </Box>

                <Button
                  className={classes.apiLink}
                  variant="text"
                  target="_blank"
                  href={linkHref}
                >
                  {linkText}
                </Button>
              </Paper>
            );
          },
        )}
      </Box>
    </>
  );
};
