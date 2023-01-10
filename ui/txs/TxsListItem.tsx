import {
  HStack,
  Box,
  Flex,
  Icon,
  Link,
  Modal,
  ModalContent,
  ModalCloseButton,
  Text,
  useColorModeValue,
  useDisclosure } from '@chakra-ui/react';
import React from 'react';

import type { Transaction } from 'types/api/transaction';

import appConfig from 'configs/app/config';
import rightArrowIcon from 'icons/arrows/east.svg';
import transactionIcon from 'icons/transactions.svg';
import getValueWithUnit from 'lib/getValueWithUnit';
import useTimeAgoIncrement from 'lib/hooks/useTimeAgoIncrement';
import link from 'lib/link/link';
import AdditionalInfoButton from 'ui/shared/AdditionalInfoButton';
import Address from 'ui/shared/address/Address';
import AddressIcon from 'ui/shared/address/AddressIcon';
import AddressLink from 'ui/shared/address/AddressLink';
import InOutTag from 'ui/shared/InOutTag';
import TxStatus from 'ui/shared/TxStatus';
import TxAdditionalInfo from 'ui/txs/TxAdditionalInfo';
import TxType from 'ui/txs/TxType';

type Props = {
  tx: Transaction;
  showBlockInfo: boolean;
  currentAddress?: string;
  enableTimeIncrement?: boolean;
}

const TAG_WIDTH = 48;
const ARROW_WIDTH = 24;

const TxsListItem = ({ tx, showBlockInfo, currentAddress, enableTimeIncrement }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const iconColor = useColorModeValue('blue.600', 'blue.300');
  const borderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');
  const dataTo = tx.to ? tx.to : tx.created_contract;

  const isOut = Boolean(currentAddress && currentAddress === tx.from.hash);
  const isIn = Boolean(currentAddress && currentAddress === tx.to?.hash);

  const timeAgo = useTimeAgoIncrement(tx.timestamp, enableTimeIncrement);

  return (
    <>
      <Box width="100%" borderBottom="1px solid" borderColor={ borderColor } _first={{ borderTop: '1px solid', borderColor }}>
        <Flex justifyContent="space-between" mt={ 4 }>
          <HStack>
            <TxType types={ tx.tx_types }/>
            <TxStatus status={ tx.status } errorText={ tx.status === 'error' ? tx.result : undefined }/>
          </HStack>
          <AdditionalInfoButton onClick={ onOpen }/>
        </Flex>
        <Flex justifyContent="space-between" lineHeight="24px" mt={ 3 } alignItems="center">
          <Flex>
            <Icon
              as={ transactionIcon }
              boxSize="30px"
              mr={ 2 }
              color={ iconColor }
            />
            <Address width="100%">
              <AddressLink
                hash={ tx.hash }
                type="transaction"
                fontWeight="700"
                truncation="constant"
              />
            </Address>
          </Flex>
          { tx.timestamp && <Text variant="secondary" fontWeight="400" fontSize="sm">{ timeAgo }</Text> }
        </Flex>
        { tx.method && (
          <Flex mt={ 3 }>
            <Text as="span" whiteSpace="pre">Method </Text>
            <Text
              as="span"
              variant="secondary"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              { tx.method }
            </Text>
          </Flex>
        ) }
        { showBlockInfo && tx.block !== null && (
          <Box mt={ 2 }>
            <Text as="span">Block </Text>
            <Link href={ link('block', { id: tx.block.toString() }) }>{ tx.block }</Link>
          </Box>
        ) }
        <Flex alignItems="center" height={ 6 } mt={ 6 }>
          <Address width={ `calc((100%-${ currentAddress ? TAG_WIDTH : ARROW_WIDTH + 8 }px)/2)` }>
            <AddressIcon address={ tx.from }/>
            <AddressLink
              hash={ tx.from.hash }
              alias={ tx.from.name }
              fontWeight="500"
              ml={ 2 }
              isDisabled={ isOut }
            />
          </Address>
          { (isIn || isOut) ?
            <InOutTag isIn={ isIn } isOut={ isOut } width="48px" mr={ 2 }/> : (
              <Icon
                as={ rightArrowIcon }
                boxSize={ 6 }
                mx={ 2 }
                color="gray.500"
              />
            ) }
          <Address width="calc((100%-40px)/2)">
            <AddressIcon address={ dataTo }/>
            <AddressLink
              hash={ dataTo.hash }
              alias={ dataTo.name }
              fontWeight="500"
              ml={ 2 }
              isDisabled={ isIn }
            />
          </Address>
        </Flex>
        <Box mt={ 2 }>
          <Text as="span">Value { appConfig.network.currency.symbol } </Text>
          <Text as="span" variant="secondary">{ getValueWithUnit(tx.value).toFormat() }</Text>
        </Box>
        <Box mt={ 2 } mb={ 3 }>
          <Text as="span">Fee { appConfig.network.currency.symbol } </Text>
          <Text as="span" variant="secondary">{ getValueWithUnit(tx.fee.value).toFormat() }</Text>
        </Box>
      </Box>
      <Modal isOpen={ isOpen } onClose={ onClose } size="full">
        <ModalContent paddingTop={ 4 }>
          <ModalCloseButton/>
          <TxAdditionalInfo tx={ tx }/>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TxsListItem;