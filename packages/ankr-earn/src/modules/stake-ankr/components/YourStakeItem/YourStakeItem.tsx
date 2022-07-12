import BigNumber from 'bignumber.js';

import { PlusMinusBtn } from 'modules/common/components/PlusMinusBtn';

import { BaseAnkrAmount } from '../BaseAnkrAmount';

import { useYourStakeItemStyles } from './useYourStakeItemStyles';

interface IYourStakeItemProps {
  ankrAmount: BigNumber;
  usdAmount: BigNumber;
  stakeLink?: string;
  unstakeLink?: string;
}

export const YourStakeItem = ({
  ankrAmount,
  usdAmount,
  stakeLink,
  unstakeLink,
}: IYourStakeItemProps): JSX.Element => {
  const classes = useYourStakeItemStyles();

  return (
    <div className={classes.root}>
      <BaseAnkrAmount
        ankrAmount={ankrAmount}
        buttonSlot={
          <div className={classes.btnWrapper}>
            {stakeLink && (
              <PlusMinusBtn
                className={classes.plusWalletButton}
                href={stakeLink}
                icon="plus"
                variant="outlined"
              />
            )}

            {unstakeLink && (
              <PlusMinusBtn
                className={classes.plusWalletButton}
                href={unstakeLink}
                icon="minus"
                variant="outlined"
              />
            )}
          </div>
        }
        usdAmount={usdAmount}
      />
    </div>
  );
};
