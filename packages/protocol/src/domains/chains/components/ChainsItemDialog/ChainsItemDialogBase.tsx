import { useCallback } from 'react';
import { Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';

import { Dialog } from 'uiKit/Dialog';
import { useHasBreakdown } from 'uiKit/Theme/useTheme';
import { NavLink } from 'uiKit/NavLink';
import { useWindowHeight } from 'hooks/useWindowHeight';
import { ConnectButton } from 'domains/auth/components/ConnectButton';
import { IChainDialogContent, chainDialogIntl } from './ChainDialogUtils';
import {
  CHAINS_DIALOG_BREAKDOWN,
  useChainsItemDialogStyles,
} from './useChainsItemDialogStyles';

export interface IChainsItemDialogBaseProps {
  open: boolean;
  onClose: () => void;
  onTrack?: () => void;
  content: IChainDialogContent[];
  isV2?: boolean;
}

export const ChainsItemDialogBase = ({
  open,
  onClose,
  onTrack,
  content,
  isV2,
}: IChainsItemDialogBaseProps): JSX.Element => {
  const windowHeight = useWindowHeight();

  const { classes, cx } = useChainsItemDialogStyles({ windowHeight });

  const hasBreakdown = useHasBreakdown(CHAINS_DIALOG_BREAKDOWN);

  const onClick = useCallback(() => {
    if (onTrack) {
      onTrack();
    }
  }, [onTrack]);

  return (
    <Dialog
      className={classes.root}
      classes={{
        container: classes.dialogContainer,
      }}
      maxPxWidth={hasBreakdown ? 600 : 980}
      onClose={onClose}
      open={open}
      paperClassName={classes.paperRoot}
    >
      <div>
        <Typography variant="h4" className={classes.dialogTitle}>
          {t(`${chainDialogIntl}.title`)}
        </Typography>
        <div className={classes.container}>
          {content.map((item: IChainDialogContent) => {
            return (
              <div
                key={`${item.title}_content`}
                className={cx(
                  `${chainDialogIntl}-${item.title}`,
                  isV2 && classes.wrapperV2,
                )}
              >
                <div className={classes.content}>
                  <div>
                    <Typography variant="h6" className={classes.title}>
                      {t(`${chainDialogIntl}.${item.title}.title`)}
                    </Typography>
                    {item.hasIntro && (
                      <Typography className={classes.intro}>
                        {tHTML(`${chainDialogIntl}.${item.title}.intro`)}
                      </Typography>
                    )}
                    <Typography className={classes.description}>
                      {t(`${chainDialogIntl}.${item.title}.description`)}
                    </Typography>
                    <div className={classes.list}>
                      {new Array(item.itemCount).fill('').map((_, index) => (
                        <div
                          key={`${item.title}_list_${index}`}
                          className={classes.item}
                        >
                          {t(
                            `${chainDialogIntl}.${item.title}.list-${
                              index + 1
                            }`,
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  {item.hasSignupButton ? (
                    <ConnectButton
                      variant="contained"
                      buttonText={item.linkText}
                      onSuccess={onClick}
                    />
                  ) : (
                    <NavLink
                      fullWidth
                      disabled={item.disabled}
                      variant={item.variant}
                      className={cx(classes.button, `${item.title}`)}
                      href={item.link}
                      onClick={onClick}
                    >
                      {item.linkText}
                    </NavLink>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Dialog>
  );
};
