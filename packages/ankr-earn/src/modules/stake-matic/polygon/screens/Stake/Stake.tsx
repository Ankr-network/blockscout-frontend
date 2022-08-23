import { Box, ButtonBase } from '@material-ui/core';

import { t, tHTML } from 'common';

import { AuditInfo, AuditInfoItem } from 'modules/common/components/AuditInfo';
import {
  AUDIT_LINKS,
  DECIMAL_PLACES,
  DEFAULT_ROUNDING,
  ONE,
} from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { StakeContainer } from 'modules/stake/components/StakeContainer';
import { StakeDescriptionAmount } from 'modules/stake/components/StakeDescriptionAmount';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionSeparator } from 'modules/stake/components/StakeDescriptionSeparator';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import { StakeForm } from 'modules/stake/components/StakeForm';
import { TokenVariant } from 'modules/stake/components/TokenVariant';
import { TokenVariantList } from 'modules/stake/components/TokenVariantList';
import { AMATICBIcon } from 'uiKit/Icons/AMATICBIcon';
import { AMATICCIcon } from 'uiKit/Icons/AMATICCIcon';
import { QuestionIcon } from 'uiKit/Icons/QuestionIcon';
import { QueryError } from 'uiKit/QueryError';
import { QueryLoadingCentered } from 'uiKit/QueryLoading';
import { Tooltip } from 'uiKit/Tooltip';

import { useStakeForm } from './hooks/useStakeForm';
import { useStakeStyles } from './useStakeStyles';

export const Stake = (): JSX.Element => {
  const classes = useStakeStyles();

  const {
    acPoolLiquidityInMATIC,
    acRatio,
    balance,
    getStatsError,
    isGetStatsLoading,
    isStakeLoading,
    stakeFeePct,
    tokenIn,
    tokenOut,
    totalAmount,
    extraValidation,
    onFormChange,
    onFormSubmit,
    onTokenSelect,
  } = useStakeForm();

  const renderStats = () => (
    <>
      <div className={classes.liquidityPoolArea}>
        <div>
          {tHTML('stake-matic-polygon.stake.liquidity-pool', {
            value: acPoolLiquidityInMATIC
              .decimalPlaces(DEFAULT_ROUNDING)
              .toFormat(),
          })}
        </div>

        <Tooltip title={t('stake-matic-polygon.tooltips.liquidity-pool')}>
          <ButtonBase className={classes.questionBtn}>
            <QuestionIcon size="xs" />
          </ButtonBase>
        </Tooltip>
      </div>

      <TokenVariantList my={5}>
        <TokenVariant
          isDisabled
          description={tHTML('stake-matic-eth.amaticb-descr')}
          iconSlot={<AMATICBIcon />}
          isActive={tokenOut === Token.aMATICb}
          title={t('unit.amaticb')}
          onClick={onTokenSelect(Token.aMATICb)}
        />

        <TokenVariant
          description={tHTML('stake-matic-eth.amaticc-descr', {
            rate: isGetStatsLoading
              ? '...'
              : ONE.dividedBy(acRatio).decimalPlaces(DECIMAL_PLACES).toFormat(),
          })}
          iconSlot={<AMATICCIcon />}
          isActive={tokenOut === Token.aMATICc}
          isDisabled={isStakeLoading}
          title={t('unit.amaticc')}
          onClick={onTokenSelect(Token.aMATICc)}
        />
      </TokenVariantList>

      {stakeFeePct && (
        <>
          <StakeDescriptionContainer>
            <StakeDescriptionName>
              <span>{t('stake-matic-polygon.fee')}</span>
            </StakeDescriptionName>

            <StakeDescriptionValue isBold={false}>
              {t('unit.percentage-value', {
                value: stakeFeePct.decimalPlaces(DECIMAL_PLACES).toFormat(),
              })}
            </StakeDescriptionValue>
          </StakeDescriptionContainer>

          <StakeDescriptionSeparator />
        </>
      )}

      <StakeDescriptionContainer>
        <StakeDescriptionName>{t('stake.you-will-get')}</StakeDescriptionName>

        <StakeDescriptionValue>
          <StakeDescriptionAmount
            symbol={tokenOut}
            value={totalAmount.decimalPlaces(DECIMAL_PLACES).toFormat()}
          />
        </StakeDescriptionValue>
      </StakeDescriptionContainer>
    </>
  );

  if (isGetStatsLoading) {
    return (
      <Box mt={5}>
        <QueryLoadingCentered />
      </Box>
    );
  }

  return (
    <section className={classes.root}>
      {getStatsError !== null && (
        <StakeContainer>
          <QueryError error={getStatsError} />
        </StakeContainer>
      )}

      {getStatsError === null && !!balance && (
        <StakeContainer>
          <StakeForm
            auditSlot={
              <AuditInfo>
                <AuditInfoItem link={AUDIT_LINKS.matic} variant="beosin" />
              </AuditInfo>
            }
            balance={balance}
            extraValidation={extraValidation}
            loading={isStakeLoading}
            maxAmount={balance}
            renderStats={renderStats}
            tokenIn={tokenIn}
            tokenOut={tokenOut}
            onChange={onFormChange}
            onSubmit={onFormSubmit}
          />
        </StakeContainer>
      )}
    </section>
  );
};
