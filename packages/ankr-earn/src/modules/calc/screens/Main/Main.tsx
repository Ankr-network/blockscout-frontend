import { Box } from '@material-ui/core';

import { t } from 'common';

import { ONE, ZERO } from 'modules/common/const';
import { AnkrIcon } from 'uiKit/Icons/AnkrIcon';
import { AvaxIcon } from 'uiKit/Icons/AvaxIcon';
import { BNBIcon } from 'uiKit/Icons/BNBIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';

import { AddTokenBtn } from './components/AddTokenBtn';
import { AddTokens } from './components/AddTokens';
import { Section } from './components/Section';
import {
  ITokensItemProps,
  TokensItem,
  TokensTable,
} from './components/TokensTable';
import { Yield } from './components/Yield';
import { useMainStyles } from './useMainStyles';

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

const DEMO_ADD_BUTTONS = [
  {
    iconSlot: <AvaxIcon />,
    token: t('unit.avax'),
  },
  {
    iconSlot: <AnkrIcon />,
    token: t('unit.ankr'),
  },
  {
    iconSlot: <MaticIcon />,
    token: t('unit.matic'),
  },
  {
    iconSlot: <EthIcon />,
    token: t('unit.eth'),
  },
];

export const Main = (): JSX.Element => {
  const classes = useMainStyles();
  return (
    <Section>
      <AddTokens className={classes.addTokens}>
        {DEMO_ADD_BUTTONS.map(({ iconSlot, token }) => (
          <AddTokenBtn key={token} iconSlot={iconSlot} token={token} />
        ))}
      </AddTokens>

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

      <Box order={{ md: 1 }}>
        <Yield
          apy={DEMO_YIELD_PROPS.apy}
          totalUsd={DEMO_YIELD_PROPS.totalUSD}
        />
      </Box>
    </Section>
  );
};
