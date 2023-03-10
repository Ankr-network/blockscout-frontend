import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { AuditInfo, AuditInfoItem } from 'modules/common/components/AuditInfo';
import { BuyAnkrLink } from 'modules/common/components/BuyAnkrLink';
import { Faq } from 'modules/common/components/Faq';
import { AUDIT_LINKS, DUNE_ANALYTICS_LINK } from 'modules/common/const';
import { Section } from 'modules/delegate-stake/components/Section';
import { StakeForm } from 'modules/delegate-stake/components/StakeForm';
import { Stats } from 'modules/delegate-stake/components/Stats';
import { ANKR_STAKING_MAX_DECIMALS_LENGTH } from 'modules/stake-ankr/api/AnkrStakingSDK/const';
import { ApprovalFormButtons } from 'modules/stake/components/ApprovalFormButtons/ApprovalFormButtons';
import { StakeContainer } from 'modules/stake/components/StakeContainer';

import { useStats } from '../../hooks/useStats';

import { useAnkrStake } from './hooks/useAnkrStake';
import { useStakeAnkrApprovalForm } from './hooks/useStakeAnkrApprovalForm';

export const Stake = (): JSX.Element => {
  const {
    additionalText,
    additionalTooltip,
    additionalValue,
    amount,
    balance,
    closeHref,
    faqItems,
    initialAmount,
    initialProvider,
    isBalanceLoading,
    isDisabled,
    isStakeLoading,
    minStake,
    providerName,
    providerSelectHref,
    quoteText,
    tokenIn,
    onChange,
    onSubmit,
  } = useAnkrStake();

  const {
    isApproveLoading,
    onApprovalSettingsFormSubmit,
    onApproveSubmit,
    approvalSettingsMode,
    allowance,
  } = useStakeAnkrApprovalForm();

  const renderFormApproveButtons = (amountValue: BigNumber) => (
    <ApprovalFormButtons
      allowance={allowance}
      amount={amountValue}
      approvalSettingsMode={approvalSettingsMode}
      isApproveLoading={isApproveLoading}
      isStakeLoading={isStakeLoading}
      minAmount={minStake}
      submitButtonLabel={t('stake-ankr.staking.submit')}
      tokenName={tokenIn}
      onApprovalSettingsFormSubmit={onApprovalSettingsFormSubmit}
      onApproveSubmit={onApproveSubmit}
    />
  );

  const {
    apyText,
    annualEarning,
    annualEarningUSD,
    totalStaked,
    totalStakedUSD,
    stakers,
    isLoading,
  } = useStats({
    amount,
  });

  return (
    <Section withContainer={false}>
      <StakeContainer>
        <StakeForm
          additionalText={additionalText}
          additionalTooltip={additionalTooltip}
          additionalValue={additionalValue}
          amount={amount}
          auditSlot={
            <AuditInfo>
              <AuditInfoItem link={AUDIT_LINKS.ankrBeosin} variant="beosin" />

              <AuditInfoItem
                link={AUDIT_LINKS.ankrVeridise}
                variant="veridise"
              />
            </AuditInfo>
          }
          balance={balance}
          balanceLinkSlot={<BuyAnkrLink />}
          closeHref={closeHref}
          initialAmount={initialAmount}
          initialProvider={initialProvider}
          isBalanceLoading={isBalanceLoading}
          isDisabled={isDisabled}
          maxAmountDecimals={ANKR_STAKING_MAX_DECIMALS_LENGTH}
          minAmount={minStake}
          providerName={providerName}
          providerSelectHref={providerSelectHref}
          quoteText={quoteText}
          renderFormApproveButtons={renderFormApproveButtons}
          tokenIn={tokenIn}
          onChange={onChange}
          onSubmit={onSubmit}
        />

        <Stats
          analyticsLink={DUNE_ANALYTICS_LINK.ankr}
          annualEarning={annualEarning}
          annualEarningUSD={annualEarningUSD}
          apyText={apyText}
          isLoading={isLoading}
          stakers={stakers}
          token={tokenIn}
          totalStaked={totalStaked}
          totalStakedUSD={totalStakedUSD}
        />

        <Faq data={faqItems} />
      </StakeContainer>
    </Section>
  );
};
