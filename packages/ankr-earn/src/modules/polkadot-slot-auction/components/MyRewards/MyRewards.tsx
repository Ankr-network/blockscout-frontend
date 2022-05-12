import { Box, Tooltip } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import { useHistory } from 'react-router';
import { uid } from 'react-uid';

import { t } from 'common';

import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'modules/common/components/TableComponents';
import { useInitEffect } from 'modules/common/hooks/useInitEffect';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { RoutesConfig } from 'modules/polkadot-slot-auction/Routes';
import { Button } from 'uiKit/Button';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';

import {
  fetchMyRewardCrowdloans,
  IFetchMyRewardCrowdloansItem,
} from '../../actions/fetchMyRewardCrowdloans';
import { useMyRewardCrowdloans } from '../../hooks/useCrowdloans';
import { useSlotAuctionSdk } from '../../hooks/useSlotAuctionSdk';
import { ConnectTooltip } from '../ConnectTooltip';
import { ENoCrowdloanTypes, NoCrowdloan } from '../NoCrowdloan';
import { ProjectMeta } from '../ProjectMeta';

import { useMyRewardsStyles } from './useMyRewardsStyles';

type CaptionType = {
  label: string;
};

/**
 *  @TODO Add data for skipped columns with a valid logic for end users
 */
export const MyRewards = (): JSX.Element => {
  const classes = useMyRewardsStyles();
  const dispatch = useDispatchRequest();
  const history = useHistory();

  const { isConnected, networkType } = useSlotAuctionSdk();
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
        label: ' ',
      },
    ],
    [],
  );

  const handleClaimBtn = (loanId: number) => (): void => {
    history.push(
      RoutesConfig.rewardsClaim.generatePath(networkType.toLowerCase(), loanId),
    );
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
      {error === null && !!crowdloans?.length && (
        <Table
          columnsCount={captions.length}
          customCell="minmax(200px, 1fr) 120px 150px 175px 220px 140px 150px"
          minWidth={1120}
        >
          <TableHead>
            {captions.map(cell => (
              <TableHeadCell key={uid(cell)} label={cell.label} />
            ))}
          </TableHead>

          <TableBody>
            {(crowdloans as IFetchMyRewardCrowdloansItem[]).map(
              (item: IFetchMyRewardCrowdloansItem): JSX.Element => {
                const { claimableRewardsAmount, loanId, rewardTokenSymbol } =
                  item;

                const isDisabledClaimBtn: boolean =
                  !isConnected || !claimableRewardsAmount.isGreaterThan(0);
                const isShowConnectTooltip = !isConnected;

                const endDateVal: string = t('format.date', {
                  value: item.endTime,
                });

                const balanceVal: string = t(
                  'polkadot-slot-auction.column.val-currency',
                  {
                    val: item.currBalance,
                    currency: item.bondTokenSymbol,
                  },
                );

                const claimableRewardsVal = `${claimableRewardsAmount.toFixed()} ${rewardTokenSymbol}`;

                return (
                  <TableRow key={uid(item)}>
                    <TableBodyCell label={captions[0].label}>
                      <ProjectMeta
                        className={classes.projectBox}
                        description={item.projectDescription}
                        img={item.projectLogo}
                        name={item.projectName}
                      />
                    </TableBodyCell>

                    <TableBodyCell label={captions[1].label}>
                      <Tooltip
                        title={
                          <div className={classes.tooltipBox}>{endDateVal}</div>
                        }
                      >
                        <span>{endDateVal}</span>
                      </Tooltip>
                    </TableBodyCell>

                    <TableBodyCell label={captions[2].label}>
                      <Tooltip
                        title={
                          <div className={classes.tooltipBox}>{balanceVal}</div>
                        }
                      >
                        <span>{balanceVal}</span>
                      </Tooltip>
                    </TableBodyCell>

                    <TableBodyCell label={captions[3].label}>
                      <Tooltip
                        title={
                          <div className={classes.tooltipBox}>
                            {claimableRewardsVal}
                          </div>
                        }
                      >
                        <span>{claimableRewardsVal}</span>
                      </Tooltip>
                    </TableBodyCell>

                    <TableBodyCell label={captions[4].label}>
                      {t('polkadot-slot-auction.column.val-currency', {
                        val: 0,
                        currency: rewardTokenSymbol,
                      })}
                    </TableBodyCell>

                    <TableBodyCell label={captions[5].label}>
                      {t('polkadot-slot-auction.column.val-currency', {
                        val: 0,
                        currency: rewardTokenSymbol,
                      })}
                    </TableBodyCell>

                    <TableBodyCell align="right" label={captions[6].label}>
                      <div className={classes.buttonCol}>
                        <Button
                          fullWidth
                          className={classes.button}
                          color="default"
                          disabled={isDisabledClaimBtn}
                          variant="outlined"
                          onClick={handleClaimBtn(loanId)}
                        >
                          {t('polkadot-slot-auction.button.claim')}
                        </Button>

                        {isShowConnectTooltip && (
                          <ConnectTooltip rootClass={classes.connectTooltip} />
                        )}
                      </div>
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
