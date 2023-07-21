import { Box, Button, Paper, Typography } from '@mui/material';
import { ExternalLink } from '@ankr.com/ui';

import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { multiChainBenefitsStyles as useStyles } from './MultiChainBenefitsStyles';
import { content } from './const';

export const MultiChainBenefits = () => {
  const { isLightTheme } = useThemes();
  const { classes } = useStyles(isLightTheme);

  return (
    <Box className={classes.wrapper}>
      {content.map(({ img, title, list, linkText, linkHref }) => {
        return (
          <Paper className={classes.apiWrapper} key={title}>
            <img className={classes.img} src={img} alt="" />

            <Typography className={classes.apiTitle} variant="subtitle1">
              {title}
            </Typography>

            <Box className={classes.apiFeaturesList}>
              {list.map(item => {
                return (
                  <Typography
                    variant="caption"
                    className={classes.apiFeaturesItem}
                    key={item}
                  >
                    {item}
                  </Typography>
                );
              })}
            </Box>

            <Button
              className={classes.apiLink}
              variant="text"
              endIcon={<ExternalLink />}
              target="_blank"
              href={linkHref}
            >
              {linkText}
            </Button>
          </Paper>
        );
      })}
    </Box>
  );
};
