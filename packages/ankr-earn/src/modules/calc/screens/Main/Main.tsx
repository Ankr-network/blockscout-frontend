import { Box } from '@material-ui/core';

import { AddTokenBtn } from './components/AddTokenBtn';
import { AddTokens } from './components/AddTokens';
import { Section } from './components/Section';
import {
  TokensItem,
  TokensItemSkeleton,
  TokensTable,
} from './components/TokensTable';
import { Yield } from './components/Yield';
import { useMain } from './hooks/useMain';
import { useTokenIcon } from './hooks/useTokenIcon';
import { useMainStyles } from './useMainStyles';

export const Main = (): JSX.Element => {
  const classes = useMainStyles();
  const tokens = useTokenIcon();

  const {
    avarageApy,
    isLoading,
    dataByToken,
    totalYearlyYieldUsd,
    visibilityState,
    valuesState,
    setTokenVisibility,
    yieldDays,
    setYieldDays,
  } = useMain();

  const { renderedAddButtons, renderedTokens } = dataByToken.reduce(
    (
      acc,
      { apy, staked, usdTokenPrice, token, handleChange, handleCloseClick },
    ) => {
      const isTokenItemVisible = visibilityState[token];

      if (isTokenItemVisible) {
        acc.renderedTokens.push(
          <TokensItem
            key={token}
            apy={apy}
            days={yieldDays}
            iconSlot={tokens[token].icon}
            staked={staked}
            token={tokens[token].name}
            usdTokenPrice={usdTokenPrice}
            value={valuesState[token]}
            onChange={handleChange}
            onCloseClick={handleCloseClick}
          />,
        );
      } else {
        const handleClick = () => setTokenVisibility(token, true);
        acc.renderedAddButtons.push(
          <AddTokenBtn
            key={token}
            iconSlot={tokens[token].icon}
            token={tokens[token].name}
            onClick={handleClick}
          />,
        );
      }

      return acc;
    },
    {
      renderedAddButtons: [] as JSX.Element[],
      renderedTokens: [] as JSX.Element[],
    },
  );

  const isTokensShowed = !!renderedTokens.length;
  const isAddTokensShowed = !!renderedAddButtons.length && !isLoading;

  return (
    <Section>
      {isAddTokensShowed && (
        <AddTokens className={classes.addTokens}>
          {renderedAddButtons}
        </AddTokens>
      )}

      {isLoading && (
        <TokensTable mb={3}>
          <TokensItemSkeleton />

          <TokensItemSkeleton />

          <TokensItemSkeleton />
        </TokensTable>
      )}

      {isTokensShowed && !isLoading && (
        <TokensTable mb={3}>{renderedTokens}</TokensTable>
      )}

      <Box order={{ md: 1 }}>
        <Yield
          apy={avarageApy}
          isLoading={isLoading}
          totalUsd={totalYearlyYieldUsd}
          onChange={setYieldDays}
        />
      </Box>
    </Section>
  );
};
