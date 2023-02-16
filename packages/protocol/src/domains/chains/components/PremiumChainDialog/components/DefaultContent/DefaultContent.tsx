import { Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';

import { Item, Title } from '../../types';
import { intlRoot } from '../../const';
import { useDefaultContentStyles } from './DefaultContentStyles';

export interface DefaultContentParams {
  isV2?: boolean;
  items: Item[];
  onPremiumUpgradeButtonClick: () => void;
  onTrack?: () => void;
}

export const DefaultContent = ({
  isV2,
  items,
  onPremiumUpgradeButtonClick,
  onTrack,
}: DefaultContentParams) => {
  const { classes, cx } = useDefaultContentStyles();

  const clickHandlersMap: Record<Title, (() => void) | undefined> = {
    [Title.free]: onTrack,
    [Title.premium]: onPremiumUpgradeButtonClick,
    [Title.enterprise]: onTrack,
  };

  return (
    <div>
      <Typography variant="h4" className={classes.dialogTitle}>
        {t(`${intlRoot}.title`)}
      </Typography>
      <div className={classes.container}>
        {items.map(({ hasIntro, itemCount, renderButton, title }) => (
          <div
            className={cx(`${intlRoot}-${title}`, {
              [classes.wrapperV2]: isV2,
            })}
            key={title}
          >
            <div className={classes.content}>
              <div>
                <Typography variant="h6" className={classes.title}>
                  {t(`${intlRoot}.${title}.title`)}
                </Typography>
                {hasIntro && (
                  <Typography className={classes.intro}>
                    {tHTML(`${intlRoot}.${title}.intro`)}
                  </Typography>
                )}
                <Typography className={classes.description}>
                  {t(`${intlRoot}.${title}.description`)}
                </Typography>
                <div className={classes.list}>
                  {new Array(itemCount).fill('').map((_, index) => (
                    <div className={classes.item} key={index}>
                      {t(`${intlRoot}.${title}.list-${index + 1}`)}
                    </div>
                  ))}
                </div>
              </div>
              {renderButton({
                className: cx(classes.button, title),
                onClick: clickHandlersMap[title],
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
