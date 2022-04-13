import { Box, IconButton, Typography } from '@material-ui/core';
import { useStyles } from './GlobalMenuListStyles';
import { Scrollbars } from 'react-custom-scrollbars';

import { ReactComponent as ArrowRightIcon } from '../assets/arrowRightLong.svg';
import { ReactComponent as ArrowLinkIcon } from '../assets/arrowLink.svg';
import { ReactComponent as CloseIcon } from '../assets/close.svg';

import { GlobalMenuListDivider } from './components/GlobalMenuListDivider';
import { Fragment, MouseEventHandler } from 'react';
import {
  withGlobalMenuLink,
  isGlobalMenuItemActive,
} from './GlobalMenuListUtils';
import classNames from 'classnames';
import { IGlobalMenuProps } from '../GlobalMenu/GlobalMenuTypes';
import { Link as RouterLink } from 'react-router-dom';
import { useMenuItems } from '../hooks/useMenuItems';
import { AnkrIntl } from 'common';

interface IGlobalMenuListProps extends IGlobalMenuProps {
  onClose: MouseEventHandler<HTMLButtonElement>;
}

export const GlobalMenuList = ({
  Link,
  isMobile,
  onClose,
  locale,
  project,
}: IGlobalMenuListProps) => {
  const classes = useStyles({ isMobile });

  const menuItems = useMenuItems({ locale, project });

  const WrappedLink = withGlobalMenuLink(Link || RouterLink);

  return (
    <div className={classes.menu}>
      {isMobile && (
        <IconButton onClick={onClose} className={classes.closeBtn}>
          <CloseIcon />
        </IconButton>
      )}
      <WrappedLink
        onClick={onClose}
        project={project}
        className={classes.menuTitleLink}
        to="/"
        linkItem={{
          project: 'landing',
          link: '/',
          label: AnkrIntl.t('global-menu.main-page'),
        }}
        target="_self"
      >
        {AnkrIntl.t('global-menu.main-page')}
        <ArrowRightIcon />
      </WrappedLink>
      <div className={classes.menuList}>
        <Scrollbars>
          {menuItems.map(({ title, items, id }) => (
            <div key={id} className={classes.menuItemGroup}>
              <Typography className={classes.menuItemTitle}>{title}</Typography>
              {items.map((item, index) => (
                <Fragment key={index}>
                  <WrappedLink
                    onClick={onClose}
                    project={project}
                    linkItem={item}
                    className={classNames({
                      [classes.activeMenuItem]: isGlobalMenuItemActive(
                        item.link,
                      ),
                    })}
                    disabled={isGlobalMenuItemActive(item.link)}
                    to={item.link}
                    target={item.isExternal ? '_blank' : '_self'}
                    key={index}
                  >
                    <div className={classes.menuItem}>
                      <div className={classes.menuItemRightBlock}>
                        <Typography
                          color="inherit"
                          className={classes.menuItemLabel}
                        >
                          {item.label}
                          {item.isExternal && (
                            <Box fontSize={12} component="sup" ml={1}>
                              <ArrowLinkIcon />
                            </Box>
                          )}
                        </Typography>
                      </div>
                    </div>
                  </WrappedLink>
                  {items[index + 1] && (
                    <GlobalMenuListDivider isMobile={isMobile} />
                  )}
                </Fragment>
              ))}
            </div>
          ))}
        </Scrollbars>
      </div>
    </div>
  );
};
