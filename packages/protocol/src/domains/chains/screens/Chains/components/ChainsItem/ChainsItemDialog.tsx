import { t, tHTML } from '@ankr.com/common';
import { Typography } from '@mui/material';
import { Dialog } from 'uiKit/Dialog';
import { NavLink } from 'uiKit/NavLink';
import { useHasBreakdown } from 'uiKit/Theme/useTheme';
import {
  chainDialogContent,
  chainDialogIntl,
  IChainDialogContent,
} from './ChainDialogUtils';
import {
  CHAINS_DIALOG_BREAKDOWN,
  useChainsItemDialogStyles,
} from './useChainsItemDialogStyles';

export interface IChainsItemDialogProps {
  open: boolean;
  onClose: () => void;
}

export const ChainsItemDialog = ({
  open,
  onClose,
}: IChainsItemDialogProps): JSX.Element => {
  const { classes, cx } = useChainsItemDialogStyles();

  const hasBreakdown = useHasBreakdown(CHAINS_DIALOG_BREAKDOWN);

  return (
    <Dialog
      paperClassName={classes.paperRoot}
      className={classes.root}
      open={open}
      onClose={onClose}
      maxPxWidth={hasBreakdown ? 600 : 980}
    >
      <div>
        <Typography variant="h4" className={classes.dialogTitle}>
          {t(`${chainDialogIntl}.title`)}
        </Typography>
        <div className={classes.container}>
          {chainDialogContent.map((item: IChainDialogContent) => (
            <div
              key={item.title}
              className={`${chainDialogIntl}-${item.title}`}
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
                      <div key={item.title} className={classes.item}>
                        {t(
                          `${chainDialogIntl}.${item.title}.list-${index + 1}`,
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <NavLink
                  fullWidth
                  disabled={item.disabled}
                  variant={item.variant}
                  className={cx(classes.button, `${item.title}`)}
                  href={item.link}
                >
                  {t(`${chainDialogIntl}.${item.title}.button`)}
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
};
