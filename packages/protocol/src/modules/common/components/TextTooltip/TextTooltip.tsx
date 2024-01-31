import { Fade, Tooltip, TooltipProps, Typography } from '@mui/material';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

import { useTextTooltipStyles } from './useTextTooltipStyles';

export interface TextTooltipProps extends Omit<TooltipProps, 'title'> {
  title: string;
}

export const TextTooltip = (props: TextTooltipProps) => {
  const { classes: classesOverrides, title, ...restProps } = props;

  const { classes, theme } = useTextTooltipStyles(undefined, {
    props: { classes: classesOverrides },
  });

  const titleColor = isLightTheme(theme)
    ? 'common.white'
    : 'background.default';

  return (
    <Tooltip
      TransitionComponent={Fade}
      classes={classes}
      disableHoverListener
      placement="top"
      title={
        <Typography color={titleColor} variant="body3">
          {title}
        </Typography>
      }
      {...restProps}
    />
  );
};
