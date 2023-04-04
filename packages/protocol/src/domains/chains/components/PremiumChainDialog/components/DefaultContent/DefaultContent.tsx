import { Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';
import { Check } from '@ankr.com/ui';

import { useThemes } from 'uiKit/Theme/hook/useThemes';
import { Item, Title } from '../../types';
import { intlRoot } from '../../const';
import { useDefaultContentStyles } from './DefaultContentStyles';

export interface DefaultContentParams {
  items: Item[];
  onEnterpriseUpgradeButtonClick: () => void;
  onPremiumUpgradeButtonClick: () => void;
  onUpgrade?: () => void;
}

export const DefaultContent = ({
  items,
  onEnterpriseUpgradeButtonClick,
  onPremiumUpgradeButtonClick,
  onUpgrade,
}: DefaultContentParams) => {
  const { isLightTheme } = useThemes();
  const { classes, cx } = useDefaultContentStyles(isLightTheme);

  const clickHandlersMap: Record<Title, (() => void) | undefined> = {
    [Title.free]: onUpgrade,
    [Title.premium]: onPremiumUpgradeButtonClick,
    [Title.enterprise]: onEnterpriseUpgradeButtonClick,
  };

  return (
    <div>
      <Typography variant="h4" className={classes.dialogTitle}>
        {t(`${intlRoot}.title`)}
      </Typography>
      <div className={classes.container}>
        {items.map(
          ({ hasIntro, itemCount, renderButton, title, isHighlighted }) => (
            <div
              className={cx(`${intlRoot}-${title}`, {
                [classes.wrapperHighlighted]: isHighlighted,
              })}
              key={title}
            >
              <div
                className={cx(classes.content, {
                  [classes.contentHighlighted]: isHighlighted,
                })}
              >
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
                        <Check className={classes.check} />{' '}
                        {t(`${intlRoot}.${title}.list-${index + 1}`)}
                      </div>
                    ))}
                  </div>
                </div>
                {renderButton({
                  className: cx(classes.button, title),
                  onClick: clickHandlersMap[title],
                  variant: isHighlighted ? 'contained' : 'outlined',
                  color: isHighlighted ? 'primary' : 'secondary',
                })}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};
