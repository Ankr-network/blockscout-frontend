import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useSubMenuStyles } from './useSubMenuStyles';
import { uid } from 'react-uid';
import { Link, Typography } from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { isExternalPath } from '../../../../common/utils/isExternalPath';

interface ILinkItemProps {
  link: string;
  title: string;
}

interface ISubMenuProps {
  className?: string;
  title: string;
  links: ILinkItemProps[];
}

export const SubMenu = ({ className, title, links }: ISubMenuProps) => {
  const classes = useSubMenuStyles();

  return (
    <li className={classNames(classes.component, className)}>
      <Typography className={classes.title} variant="body1">
        {title}
      </Typography>

      <ul className={classes.list}>
        {links.map(link => {
          return (
            <li key={uid(link)} className={classes.item}>
              {isExternalPath(link.link) ? (
                <Link target="_blank" className={classes.link} href={link.link}>
                  {t(link.title)}
                </Link>
              ) : (
                <NavLink
                  activeClassName={classes.activeLink}
                  className={classes.link}
                  to={link.link}
                >
                  {t(link.title)}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    </li>
  );
};
