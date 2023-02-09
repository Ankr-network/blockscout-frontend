import {
  Breadcrumbs as BreadcrumbsBase,
  Typography,
  capitalize,
  useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { ArrowRight } from '@ankr.com/ui';
import { useStyles } from './BreadcrumbsStyles';
import { BreadcrumbsProps } from './BreadcrumbsTypes';
import { useIsMDDown } from 'uiKit/Theme/useTheme';

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const isMobile = useIsMDDown();
  const isLessThanMaxWidth = useMediaQuery('(max-width:1100px)');

  const shouldShowMobileBreadcrumbs =
    isMobile || (isLessThanMaxWidth && items.length > 2);

  const { classes, cx } = useStyles(shouldShowMobileBreadcrumbs);

  return (
    <BreadcrumbsBase
      aria-label="breadcrumb"
      separator={<ArrowRight className={classes.separator} />}
      classes={{
        root: classes.breadcrumbsRoot,
        ol: classes.breadcrumbs,
        li: classes.breadcrumbsLi,
      }}
    >
      {items.map((item, index) => {
        const { title, link, onClick } = item;

        const isLastIcon = index === items.length - 2;

        if (link || onClick) {
          if (!isLastIcon && shouldShowMobileBreadcrumbs) return null;

          return (
            <Typography
              component={link ? Link : Typography}
              color="inherit"
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
          <Typography
            className={classes.typography}
            color="textPrimary"
            variant="h3"
            key={title}
          >
            {capitalize(title)}
          </Typography>
        );
      })}
    </BreadcrumbsBase>
  );
};