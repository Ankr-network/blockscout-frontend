import { Box } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import { useInitEffect } from 'modules/common/hooks/useInitEffect';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import React, { useState } from 'react';
import { uid } from 'react-uid';
import { Button } from 'uiKit/Button';
import { QueryError } from 'uiKit/QueryError';
import { QueryLoading, QueryLoadingCentered } from 'uiKit/QueryLoading';
import { claimStakingRewards } from '../../actions/claimStakingRewards';
import {
  fetchMyRewardCrowdloans,
  IFetchMyRewardCrowdloansItem,
} from '../../actions/fetchMyRewardCrowdloans';
import { useMyRewardCrowdloans } from '../../hooks/useCrowdloans';
import { useSlotAuctionSdk } from '../../hooks/useSlotAuctionSdk';
import { ENoCrowdloanTypes, NoCrowdloan } from '../NoCrowdloan';
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../Table';
import { CaptionType } from '../Table/types';
import { useMyRewardsStyles } from './useMyRewardsStyles';

/**
 *  @TODO Add data for skipped columns with a valid logic for end users
 */
export const MyRewards = () => {
  const [loading, setLoading] = useState(false);

  const classes = useMyRewardsStyles();
  const dispatch = useDispatchRequest();

  const { polkadotAccount } = useSlotAuctionSdk();
  const { crowdloans, error, isLoading } = useMyRewardCrowdloans();

  const captions: CaptionType[] = useLocaleMemo(
    () => [
      {
        label: t('polkadot-slot-auction.header.parachain-bond'),
      },
      {
        label: t('polkadot-slot-auction.header.end-date'),
      },
      {
        label: t('polkadot-slot-auction.header.balance'),
      },
      {
        label: t('polkadot-slot-auction.header.claimable-rewards'),
      },
      {
        label: t('polkadot-slot-auction.header.future-rewards'),
      },
      {
        label: t('polkadot-slot-auction.header.total-rewards'),
      },
      {
        label: '',
      },
    ],
    [],
  );

  const handleClaim = (loanId: number) => async (): Promise<void> => {
    setLoading(true);

    await dispatch(claimStakingRewards(polkadotAccount, loanId));

    setLoading(false);
  };

  useInitEffect((): void => {
    dispatch(fetchMyRewardCrowdloans());
  });

  if (isLoading) {
    return (
      <Box mt={5}>
        <QueryLoadingCentered />
      </Box>
    );
  }

  return (
    <>
      {error !== null && <QueryError error={error} />}

      {error === null && !!crowdloans?.length && (
        <Table
          customCell="2fr 2fr 1fr 2fr 2fr 1fr 2fr"
          columnsCount={captions.length}
          paddingCollapse
        >
          <TableHead>
            {captions.map(cell => (
              <TableHeadCell
                key={uid(cell)}
                label={cell.label}
                align={cell.align}
              />
            ))}
          </TableHead>
          <TableBody>
            {(crowdloans as IFetchMyRewardCrowdloansItem[]).map(
              (item: IFetchMyRewardCrowdloansItem): JSX.Element => {
                const {
                  claimableRewardsAmount,
                  loanId,
                  rewardTokenSymbol,
                } = item;

                const isDisabledClaimBtn: boolean =
                  loading || !claimableRewardsAmount.isGreaterThan(0);

                return (
                  <TableRow key={uid(item)}>
                    <TableBodyCell>
                      <Box display="flex" alignItems="center">
                        <img
                          src={item.projectLogo}
                          alt={item.projectDescription}
                          className={classes.img}
                        />

                        {item.projectName}
                      </Box>
                    </TableBodyCell>

                    <TableBodyCell>
                      {t('format.date', { value: item.endTime })}
                    </TableBodyCell>

                    <TableBodyCell>
                      {t('polkadot-slot-auction.column.val-currency', {
                        val: item.currBalance,
                        currency: item.bondTokenSymbol,
                      })}
                    </TableBodyCell>

                    <TableBodyCell>
                      {claimableRewardsAmount.toFixed()} {rewardTokenSymbol}
                    </TableBodyCell>

                    <TableBodyCell>
                      {t('polkadot-slot-auction.column.val-currency', {
                        val: 0,
                        currency: rewardTokenSymbol,
                      })}
                    </TableBodyCell>

                    <TableBodyCell>
                      {t('polkadot-slot-auction.column.val-currency', {
                        val: 0,
                        currency: rewardTokenSymbol,
                      })}
                    </TableBodyCell>

                    <TableBodyCell>
                      <Box display="flex" justifyContent="flex-end">
                        <Button
                          className={classes.button}
                          disabled={isDisabledClaimBtn}
                          onClick={handleClaim(loanId)}
                          variant="outlined"
                        >
                          {t('polkadot-slot-auction.button.claim-rewards')}
                        </Button>

                        {loading && <QueryLoading size={40} />}
                      </Box>
                    </TableBodyCell>
                  </TableRow>
                );
              },
            )}
          </TableBody>
        </Table>
      )}

      {!crowdloans?.length && (
        <NoCrowdloan
          classRoot={classes.noCrowdloanArea}
          type={ENoCrowdloanTypes.MyRewards}
        />
      )}
    </>
  );
};
