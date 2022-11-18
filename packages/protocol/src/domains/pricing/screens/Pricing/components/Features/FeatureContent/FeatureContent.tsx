import { ReactNode } from 'react';
import { Box, Typography } from '@material-ui/core';

import { t } from '@ankr.com/common';
import { ReactComponent as PlusIcon } from 'uiKit/Icons/plus.svg';
import { ReactComponent as MinusIcon } from 'uiKit/Icons/minus.svg';
import { intlRoot } from '../FeatureTable/FeatureTableUtils';
import { useFeatureTableMobileStyles } from '../FeatureTableMobile/useFeatureTableMobileStyles';
import { Collapse } from 'uiKit/Collapse';

interface IFeatureContentProps {
  itemIndex: number;
  name: string;
  num: number;
  button: ReactNode;
}

export const FeatureContent = ({
  itemIndex,
  name,
  num,
  button,
}: IFeatureContentProps) => {
  const classes = useFeatureTableMobileStyles();

  return (
    <div className={classes.item}>
      <Box className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          <span
            className={
              itemIndex === 3
                ? classes.liner
                : itemIndex === 4
                ? classes.primary
                : ''
            }
          >
            {t(`${intlRoot}.header.column-${itemIndex}`)}
          </span>
        </Typography>
        {button}
      </Box>
      <Typography variant="body1" className={classes.summary}>
        {t(`${intlRoot}.header-summary.column-${itemIndex}`)}
      </Typography>
      <Collapse
        className={classes.collapse}
        header={
          <Typography variant="body1" className={classes.included}>
            {t(`${intlRoot}.what-is-included`)}
          </Typography>
        }
        collapsedIcon={<PlusIcon className={classes.icon} />}
        uncollapsedIcon={<MinusIcon className={classes.icon} />}
        content={
          <div className={classes.content}>
            {new Array(num).fill('').map((_, index) => (
              <Typography
                variant="body1"
                className={classes.info}
                key={`${name}-${index}`}
              >
                {t(`${intlRoot}.${name}.item-${index + 1}`)}
              </Typography>
            ))}
          </div>
        }
      />
    </div>
  );
};
