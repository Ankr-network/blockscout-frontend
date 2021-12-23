import { TCrowdloanStatus } from '@ankr.com/stakefi-polkadot/dist/types/entity';
import { Box } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { DEFAULT_FIXED, ZERO_ADDR } from 'modules/common/const';
import { useInitEffect } from 'modules/common/hooks/useInitEffect';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { uid } from 'react-uid';
import { Button } from 'uiKit/Button';
import { QueryError } from 'uiKit/QueryError';
import { QueryLoading, QueryLoadingCentered } from 'uiKit/QueryLoading';
import { Body2 } from 'uiKit/Typography';
import { claimRewardPoolTokens } from '../../actions/claimRewardPoolTokens';
import { IFetchCrowdloanBalancesItem } from '../../actions/fetchCrowdloanBalances';
import { ICrowdloanByStatus } from '../../actions/fetchCrowdloansByStatus';
import { fetchProjectsListCrowdloans } from '../../actions/fetchProjectsListCrowdloans';
import {
  useCrowdloanBalances,
  useProjectsListCrowdloans,
} from '../../hooks/useCrowdloans';
import { useSlotAuctionSdk } from '../../hooks/useSlotAuctionSdk';
import { RoutesConfig } from '../../Routes';
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
import { useProjectsListStyles } from './useProjectsListStyles';

export const ProjectsList = () => {
  const classes = useProjectsListStyles();
  const dispatch = useDispatchRequest();
  const history = useHistory();

  const { isConnected, networkType, polkadotAccount } = useSlotAuctionSdk();
  const { crowdloans, error, isLoading } = useProjectsListCrowdloans();
  const { balances } = useCrowdloanBalances();

  const [loading, setLoading] = useState(false);

  const captions: CaptionType[] = useLocaleMemo(
    () => [
      {
        label: t('polkadot-slot-auction.header.project'),
      },
      {
        label: t('polkadot-slot-auction.header.lease-duration'),
      },
      {
        label: t('polkadot-slot-auction.header.hard-cap'),
      },
      {
        label: '',
      },
    ],
    [],
  );

  const getLabelTxt = (status: TCrowdloanStatus): string | null => {
    if (status === 'FAILED_REFUNDING' || status === 'FAILED_RETIRED') {
      return t('polkadot-slot-auction.labels.failed');
    }

    if (status === 'PAUSED') {
      return t('polkadot-slot-auction.labels.paused');
    }

    if (status === 'SUCCEEDED') {
      return t('polkadot-slot-auction.labels.winner');
    }

    return null;
  };

  const handleContributeBtn = (
    loanId: number,
    projectName: string,
  ) => (): void =>
    history.push(
      RoutesConfig.lend.generatePath(
        networkType.toLowerCase(),
        loanId,
        projectName,
      ),
    );

  const handleClaimBtn = (loanId: number) => async (): Promise<void> => {
    setLoading(true);

    await dispatch(claimRewardPoolTokens(polkadotAccount, loanId));

    setLoading(false);
  };

  useInitEffect((): void => {
    dispatch(fetchProjectsListCrowdloans());
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
          customCell="3fr 3fr 3fr 3fr"
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
            {(crowdloans as ICrowdloanByStatus[]).map(item => {
              const { bondTokenSymbol, loanId, projectName, status } = item;

              const balanceItem: IFetchCrowdloanBalancesItem | undefined =
                balances[loanId];

              const isContributeBtn: boolean =
                status === 'ONGOING' ||
                status === 'CREATED' ||
                status === 'PAUSED';
              const isClaimBtn: boolean = status === 'SUCCEEDED';
              const isDisabledContributeBtn: boolean =
                !isConnected || status !== 'ONGOING';
              const isDisabledClaimBtn: boolean =
                !isConnected ||
                loading ||
                item.bondTokenContract === ZERO_ADDR ||
                !(balanceItem?.claimable instanceof BigNumber) ||
                balanceItem.claimable.isZero();

              const providedBalance: BigNumber =
                balanceItem?.claimable ?? new BigNumber(0);
              const currLabelTxt: string | null = getLabelTxt(status);

              return (
                <TableRow key={uid(item)}>
                  <TableBodyCell>
                    {currLabelTxt && (
                      <div className={classes.label}>{currLabelTxt}</div>
                    )}

                    <Box display="flex" alignItems="center">
                      <img
                        src={item.projectLogo}
                        alt={item.projectDescription}
                        className={classes.img}
                      />
                      {projectName}
                    </Box>
                  </TableBodyCell>

                  <TableBodyCell>
                    {t('format.date', { value: item.startLease })}
                    {' – '}
                    {t('format.date', { value: item.endLease })}
                  </TableBodyCell>

                  <TableBodyCell>
                    <Body2
                      className={classes.bondTokenValuesCol}
                      color="textPrimary"
                    >
                      {t('polkadot-slot-auction.column.bond-token-values', {
                        val1: item.stakeFiContributed,
                        val2: item.alreadyContributed,
                        val3: item.totalRaiseTarget,
                        currency: networkType,
                      })}
                    </Body2>
                  </TableBodyCell>

                  <TableBodyCell align="right">
                    {isContributeBtn && (
                      <Button
                        className={classes.button}
                        color="default"
                        disabled={isDisabledContributeBtn}
                        onClick={handleContributeBtn(loanId, projectName)}
                        variant="outlined"
                      >
                        {!providedBalance.isZero() ? (
                          <>
                            <span>
                              {t('polkadot-slot-auction.button.provided', {
                                value: providedBalance,
                                currency: networkType,
                              })}
                            </span>

                            <span className={classes.plus}>+</span>
                          </>
                        ) : (
                          t('polkadot-slot-auction.button.contribute', {
                            currency: networkType,
                          })
                        )}
                      </Button>
                    )}

                    {isClaimBtn && (
                      <Button
                        className={classes.button}
                        color="default"
                        disabled={isDisabledClaimBtn}
                        onClick={handleClaimBtn(loanId)}
                        variant="outlined"
                      >
                        {balanceItem?.claimable instanceof BigNumber &&
                        !balanceItem.claimable.isZero()
                          ? t('polkadot-slot-auction.button.claim-tokens', {
                              value: balanceItem.claimable
                                .decimalPlaces(DEFAULT_FIXED)
                                .toString(10),
                              currency: bondTokenSymbol,
                            })
                          : t('polkadot-slot-auction.button.claim', {
                              currency: bondTokenSymbol,
                            })}

                        {loading && <QueryLoading size={40} />}
                      </Button>
                    )}
                  </TableBodyCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}

      {!crowdloans?.length && (
        <NoCrowdloan
          classRoot={classes.noCrowdloanArea}
          type={ENoCrowdloanTypes.ProjectsList}
        />
      )}
    </>
  );
};
