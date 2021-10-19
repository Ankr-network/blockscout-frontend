import React from 'react';
import {
  Breadcrumbs as BreadcrumbsBase,
  Typography,
  capitalize,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { AngleRightIcon } from 'uiKit/Icons/AngleRightIcon';
import { useStyles } from './BreadcrumbsStyles';
import { BreadcrumbsProps } from './BreadcrumbsTypes';

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const classes = useStyles();

  return (
    <BreadcrumbsBase
      aria-label="breadcrumb"
      separator={<AngleRightIcon className={classes.separator} />}
      classes={{
        ol: classes.breadcrumbs,
      }}
    >
      {items.map(item => {
        const { title, link } = item;

        if (link) {
          return (
            <Link
              color="inherit"
              to={link}
              className={classNames(classes.link, 'custom-link')}
              key={title}
            >
              {capitalize(title)}
            </Link>
          );
        }

        return (
          <Typography color="textPrimary" variant="h3" key={title}>
            {capitalize(title)}
          </Typography>
        );
      })}
    </BreadcrumbsBase>
  );
};
