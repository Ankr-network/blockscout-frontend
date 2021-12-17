import classNames from 'classnames';
import { LITEPAPER_CN, LITEPAPER_EN } from 'modules/common/const';
import { t } from 'modules/i18n/utils/intl';
import { Socials } from 'modules/layout/components/Socials';
import React from 'react';
import { uid } from 'react-uid';
import { Curtains } from 'uiKit/Curtains';
import { NavLink } from 'uiKit/NavLink';
import { useFooterStyles } from './useFooterStyles';

export interface IFooterProps {
  className?: string;
}

const LINKS = [
  {
    label: 'litepaper-links.en',
    href: LITEPAPER_EN,
  },
  {
    label: 'litepaper-links.cn',
    href: LITEPAPER_CN,
  },
];

export const Footer = ({ className }: IFooterProps) => {
  const classes = useFooterStyles();

  return (
    <footer className={classNames(classes.component, className)}>
      <Curtains classes={{ root: classes.wrapper }}>
        <p className={classes.copyright}>{t('rights')}</p>

        <ul className={classes.list}>
          {LINKS.map(link => (
            <li className={classes.item} key={uid(link)}>
              <NavLink
                className={classes.link}
                activeClassName={classes.active}
                href={link.href}
                size="small"
                color="secondary"
              >
                {t(link.label)}
              </NavLink>
            </li>
          ))}
        </ul>

        <Socials className={classes.social} />
      </Curtains>
    </footer>
  );
};
