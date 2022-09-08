import { Box } from '@material-ui/core';

import { SUPPORTED_TOKENS } from 'modules/calc/const';

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
    visibleCount,
    handleAdd,
  } = useMain();

  const isTokensShowed = visibleCount > 0;
  const isAddTokensShowed =
    visibleCount < SUPPORTED_TOKENS.length && !isLoading;

  const renderedAddButtons = visibilityState.map(({ visible, token }) => {
    const handleClick = () => handleAdd(token);
    return !visible ? (
      <AddTokenBtn
        key={token}
        iconSlot={tokens[token].icon}
        token={tokens[token].name}
        onClick={handleClick}
      />
    ) : null;
  });

  const renderedTokens = visibilityState.map(({ visible, token }) => {
    if (!visible) {
      return null;
    }

    return (
      <TokensItem
        key={token}
        apy={dataByToken[token].apy}
        iconSlot={tokens[token].icon}
        staked={dataByToken[token].staked}
        token={tokens[token].name}
        usdTokenPrice={dataByToken[token].usdTokenPrice}
        value={valuesState[token]}
        onChange={dataByToken[token].handleChange}
        onCloseClick={dataByToken[token].handleCloseClick}
      />
    );
  });

  const tokensTableOffset = {
    xs: 3,
    md: isAddTokensShowed ? 3 : 5,
  };

  return (
    <Section>
      {isAddTokensShowed && (
        <AddTokens className={classes.addTokens}>
          {renderedAddButtons}
        </AddTokens>
      )}

      {isLoading && (
        <TokensTable mb={tokensTableOffset}>
          <TokensItemSkeleton />

          <TokensItemSkeleton />

          <TokensItemSkeleton />
        </TokensTable>
      )}

      {isTokensShowed && !isLoading && (
        <TokensTable mb={tokensTableOffset}>{renderedTokens}</TokensTable>
      )}

      <Box order={{ md: 1 }}>
        <Yield
          apy={avarageApy}
          isLoading={isLoading}
          totalUsd={totalYearlyYieldUsd}
        />
      </Box>
    </Section>
  );
};
