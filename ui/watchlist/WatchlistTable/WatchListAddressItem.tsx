import { HStack, VStack, Text, Icon, Flex } from '@chakra-ui/react';
import React from 'react';

import type { TWatchlistItem } from 'types/client/account';

import appConfig from 'configs/app/config';
import TokensIcon from 'icons/tokens.svg';
// import WalletIcon from 'icons/wallet.svg';
import { nbsp } from 'lib/html-entities';
import AddressSnippet from 'ui/shared/AddressSnippet';
import CurrencyValue from 'ui/shared/CurrencyValue';
import TokenLogo from 'ui/shared/TokenLogo';

const WatchListAddressItem = ({ item }: {item: TWatchlistItem}) => {
  const infoItemsPaddingLeft = { base: 1, lg: 8 };

  return (
    <VStack spacing={ 2 } align="stretch" fontWeight={ 500 }>
      <AddressSnippet address={ item.address }/>
      <Flex fontSize="sm" h={ 6 } pl={ infoItemsPaddingLeft } flexWrap="wrap" alignItems="center" rowGap={ 1 }>
        { appConfig.network.currency.address && (
          <TokenLogo
            hash={ appConfig.network.currency.address }
            name={ appConfig.network.name }
            boxSize={ 4 }
            borderRadius="sm"
            mr={ 2 }
          />
        ) }
        <Text as="span" whiteSpace="pre">{ appConfig.network.currency.symbol } balance: </Text>
        <CurrencyValue
          value={ item.address_balance }
          exchangeRate={ item.exchange_rate }
          decimals={ String(appConfig.network.currency.decimals) }
          accuracy={ 2 }
          accuracyUsd={ 2 }
        />
      </Flex>
      { item.tokens_count && (
        <HStack spacing={ 0 } fontSize="sm" h={ 6 } pl={ infoItemsPaddingLeft }>
          <Icon as={ TokensIcon } mr={ 2 } w="17px" h="16px"/>
          <Text>{ `Tokens:${ nbsp }` + item.tokens_count }</Text>
          { /* api does not provide token prices */ }
          { /* <Text variant="secondary">{ `${ nbsp }($${ item.tokensUSD } USD)` }</Text> */ }
          <Text variant="secondary">{ `${ nbsp }(N/A)` }</Text>
        </HStack>
      ) }
      { /* api does not provide token prices */ }
      { /* { item.address_balance && (
          <HStack spacing={ 0 } fontSize="sm" h={ 6 } pl={ infoItemsPaddingLeft }>
            <Icon as={ WalletIcon } mr={ 2 } w="16px" h="16px"/>
            <Text>{ `Net worth:${ nbsp }` }</Text>
            <Link href="#">{ `$${ item.totalUSD } USD` }</Link>
          </HStack>
        ) } */ }
    </VStack>
  );
};

export default WatchListAddressItem;