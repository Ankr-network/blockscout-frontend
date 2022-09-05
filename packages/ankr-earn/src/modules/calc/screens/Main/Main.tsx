import { ONE, ZERO } from 'modules/common/const';
import { BNBIcon } from 'uiKit/Icons/BNBIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';

import { Section } from './components/Section';
import {
  ITokensItemProps,
  TokensItem,
  TokensTable,
} from './components/TokensTable';
import { Yield } from './components/Yield';

const DEMO_YIELD_PROPS = {
  totalUSD: 350_000,
  apy: 9.3,
};

const DEMO_TOKENS_DATA: ITokensItemProps[] = [
  {
    value: 10,
    apy: 3.56,
    staked: ZERO,
    usdTokenPrice: 1200,
    onChange: () => null,
    iconSlot: <EthIcon />,
    token: 'ETH',
  },
  {
    value: 3,
    apy: 3.92,
    staked: ONE,
    usdTokenPrice: 0.9,
    onChange: () => null,
    iconSlot: <BNBIcon />,
    token: 'BNB',
  },
];

export const Main = (): JSX.Element => {
  return (
    <Section>
      <TokensTable mb={3}>
        {DEMO_TOKENS_DATA.map(item => (
          <TokensItem
            key={item.token}
            apy={item.apy}
            iconSlot={item.iconSlot}
            staked={item.staked}
            token={item.token}
            usdTokenPrice={item.usdTokenPrice}
            value={item.value}
            onChange={item.onChange}
          />
        ))}
      </TokensTable>

      <Yield apy={DEMO_YIELD_PROPS.apy} totalUsd={DEMO_YIELD_PROPS.totalUSD} />
    </Section>
  );
};
