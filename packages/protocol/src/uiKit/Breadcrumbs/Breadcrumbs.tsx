import {
  Breadcrumbs as BreadcrumbsBase,
  Typography,
  capitalize,
  useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowRight, Chip } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { useHasBreakdown, useIsMDDown } from 'uiKit/Theme/useTheme';

import { BreadcrumbsProps } from './types';
import { useBreadcrumbsStyles } from './useBreadcrumbsStyles';

export const Breadcrumbs = ({
  customBreakpoint = 0,
  isPublic = false,
  items,
}: BreadcrumbsProps) => {
  const isMDDown = useIsMDDown();
  const hasCustomBreakpoint = useHasBreakdown(customBreakpoint);
  const isLessThanMaxWidth = useMediaQuery('(max-width:1100px)');

  const isMobile = customBreakpoint ? hasCustomBreakpoint : isMDDown;

  const shouldShowMobileBreadcrumbs =
    isMobile || (isLessThanMaxWidth && items.length > 2);

  const { classes, cx } = useBreadcrumbsStyles(shouldShowMobileBreadcrumbs);

  return (
    <BreadcrumbsBase
      aria-label="breadcrumb"
      separator={<ArrowRight className={classes.separator} />}
      classes={{
        root: classes.breadcrumbsRoot,
        ol: classes.breadcrumbs,
        li: classes.breadcrumbsLi,
        separator: classes.muiSeparator,
      }}
    >
      {items.map((item, index) => {
        const { link, onClick, title } = item;

        const isLastIcon = index === items.length - 2;

        if (link || onClick) {
          if (!isLastIcon && shouldShowMobileBreadcrumbs) return null;

          return (
            <Typography
              component={link ? Link : Typography}
              color="inherit"
              variant="subtitle2"
              to={link || ''}
              onClick={onClick}
              className={cx(classes.link, 'custom-link')}
              key={title}
            >
              {shouldShowMobileBreadcrumbs ? (
                <ArrowRight className={classes.mobileBackButton} />
              ) : (
                capitalize(title)
              )}
            </Typography>
          );
        }

        return (
          <div className={classes.wrapper} key={title}>
            <Typography
              className={classes.item}
              color="textPrimary"
              variant="subtitle2"
              component="div"
            >
              <span className={classes.breadcrumbsTitle}>
                {capitalize(title)}
              </span>
            </Typography>
            {isPublic && (
              <Chip
                className={classes.chip}
                label={
                  <Typography variant="body3" color="textSecondary">
                    {t('chains.public')}
                  </Typography>
                }
                variant="filled"
                size="small"
              />
            )}
          </div>
        );
      })}
    </BreadcrumbsBase>
  );
};
