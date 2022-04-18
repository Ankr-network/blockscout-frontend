import { Drawer, IconButton, Popover } from '@material-ui/core';
import {
  MouseEventHandler,
  useEffect,
  useState,
  useRef,
} from 'react';
import { ReactComponent as MenuDotIcon } from '../assets/menuDot.svg';
import { useStyles } from './GlobalMenuStyles';
import { useLocaleInitializer } from '../i18n/utils/useLocaleInitializer';
import { GlobalMenuList } from '../GlobalMenuList';
import { withTheme } from '../themes/withTheme';
import { IGlobalMenuProps } from './GlobalMenuTypes';
import classNames from 'classnames';
import { getPopoverPosition } from './GlobalMenuUtils';

const GlobalMenuCommon = ({
  isMobile,
  className,
  locale,
  fallBack,
  ...rest
}: IGlobalMenuProps) => {
  const anchorEl = useRef<HTMLButtonElement | null>(null);

  const { top, left } = getPopoverPosition(anchorEl.current);

  const classes = useStyles({ top, left });
  const [isOpened, setIsOpened] = useState(false);

  const { isInitialized } = useLocaleInitializer({ locale });

  useEffect(() => {
    if (!isInitialized) {
      setIsOpened(false);
    }
  }, [isInitialized]);

  const handleClose: MouseEventHandler<HTMLButtonElement> = () => {
    setIsOpened(false);
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
    event.preventDefault();
    event.stopPropagation();

    setIsOpened(true);
  };

  if (!isInitialized) {
    return fallBack || null;
  }

  return (
    <>
      <IconButton
        ref={anchorEl}
        edge="start"
        disableRipple
        disableFocusRipple
        className={classNames(classes.button, className, {
          [classes.buttonActive]: isOpened,
        })}
        onClick={handleClick}
      >
        <MenuDotIcon />
      </IconButton>
      <>
        {isMobile ? (
          <Drawer
            classes={{ paper: classes.paper }}
            disableEnforceFocus
            transitionDuration={125}
            open={isOpened}
            anchor="left"
            onClose={handleClose}
          >
            <GlobalMenuList
              locale={locale}
              onClose={handleClose}
              isMobile
              {...rest}
            />
          </Drawer>
        ) : (
          <Popover
            anchorReference="none"
            PaperProps={{
              style: {
                top,
                left,
              },
            }}
            classes={{ paper: classNames(classes.paper, classes.popover) }}
            disableEnforceFocus
            transitionDuration={125}
            open={isOpened}
            onClose={handleClose}
          >
            <GlobalMenuList
              locale={locale}
              onClose={handleClose}
              isMobile={false}
              {...rest}
            />
          </Popover>
        )}
      </>
    </>
  );
};

export const GlobalMenu = withTheme((props: IGlobalMenuProps) => {
  return <GlobalMenuCommon {...props} />;
});
