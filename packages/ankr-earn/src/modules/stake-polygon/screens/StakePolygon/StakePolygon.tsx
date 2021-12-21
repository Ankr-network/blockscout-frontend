import { useDispatchRequest, useMutation } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { Queries } from 'modules/common/components/Queries/Queries';
import { ResponseData } from 'modules/common/components/ResponseData';
import { DECIMAL_PLACES } from 'modules/common/const';
import { useInitEffect } from 'modules/common/hooks/useInitEffect';
import { t } from 'modules/i18n/utils/intl';
import { StakeDescriptionContainer } from 'modules/stake/components/StakeDescriptionContainer';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { StakeDescriptionValue } from 'modules/stake/components/StakeDescriptionValue';
import {
  IStakeSubmitPayload,
  StakeForm,
} from 'modules/stake/components/StakeForm';
import { useCallback } from 'react';
import { useHistory } from 'react-router';
import { fetchStats } from '../../actions/fetchStats';
import { stake } from '../../actions/stake';
import { RoutesConfig } from '../../Routes';

const FAQ: Record<string, string>[] = [
  {
    question: 'stake.faq.question-1',
    answer: 'stake.faq.answer-1',
  },
  {
    question: 'stake.faq.question-2',
    answer: 'stake.faq.answer-2',
  },
  {
    question: 'stake.faq.question-3',
    answer: 'stake.faq.answer-3',
  },
  {
    question: 'stake.faq.question-4',
    answer: 'stake.faq.answer-4',
  },
  {
    question: 'stake.faq.question-5',
    answer: 'stake.faq.answer-5',
  },
];

// TODO: insert proper values

const Stats: Record<string, string>[] = [
  {
    label: 'stake.stats.apr',
    value: '123',
  },
  {
    label: 'stake.stats.yearly-earning',
    value: '123',
  },
  {
    label: 'stake.stats.staked-with-ankr',
    value: '123',
  },
  {
    label: 'stake.stats.stakers',
    value: '123',
  },
];

export const StakePolygon = () => {
  const { push } = useHistory();
  const dispatchRequest = useDispatchRequest();

  useInitEffect(() => {
    dispatchRequest(fetchStats());
  });

  const handleSubmit = ({ amount }: IStakeSubmitPayload): void => {
    dispatchRequest(stake({ amount: new BigNumber(amount) })).then(
      ({ error }) => {
        if (!error) {
          push(RoutesConfig.dashboard.generatePath());
        }
      },
    );
  };

  const { loading } = useMutation({ type: stake.toString() });

  const handleCancel = useCallback(() => {
    push(RoutesConfig.dashboard.generatePath());
  }, [push]);

  // TODO: proper "you will get" value

  const renderStats = useCallback((amount: number) => {
    const isZeroAmount: boolean = amount === 0;
    return (
      <StakeDescriptionContainer>
        <>
          <StakeDescriptionName>{t('stake.you-will-get')}</StakeDescriptionName>

          <StakeDescriptionValue>
            {t(isZeroAmount ? 'unit.matic-value' : 'unit.~polygon', {
              value: new BigNumber(amount).decimalPlaces(DECIMAL_PLACES),
            })}
          </StakeDescriptionValue>
        </>
      </StakeDescriptionContainer>
    );
  }, []);

  return (
    <Queries<ResponseData<typeof fetchStats>> requestActions={[fetchStats]}>
      {({ data }) => (
        <StakeForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          balance={data.maticBalance}
          maxAmount={data.maticBalance.toNumber()}
          stakingAmountStep={0.1}
          minAmount={data.minimumStake.toNumber()}
          loading={loading}
          currency={t('unit.polygon')}
          renderStats={renderStats}
          faq={FAQ}
          stats={Stats}
        />
      )}
    </Queries>
  );
};
