import { t } from '@ankr.com/common';
import { Box } from '@material-ui/core';
import _capitalize from 'lodash/capitalize';
import { useMemo, useState } from 'react';
import { uid } from 'react-uid';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackClickDefiAggregator } from 'modules/analytics/tracking-actions/trackClickDefiAggregator';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { ScrollableTable } from 'modules/common/components/ScrollableTable';
import { IDeFiItem } from 'modules/defi-aggregator/actions/getDeFiData';
import {
  useStakingTypes,
  useTokenNetworks,
} from 'modules/defi-aggregator/hooks';
import { parseAssets } from 'modules/defi-aggregator/utils/parseAssets';
import { Button } from 'uiKit/Button';
import { OutLinkIcon } from 'uiKit/Icons/OutLinkIcon';
import { Tooltip } from 'uiKit/Tooltip';

import { NetworkIcon } from '../NetworkIcon';
import { TokenIcon } from '../TokenIcon';

import { useTableStyles } from './useTableStyles';

interface ITableProps {
  data: IDeFiItem[];
}

export const Table = ({ data }: ITableProps): JSX.Element => {
  const [sortKey, setSortKey] = useState<keyof IDeFiItem | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const styles = useTableStyles();

  const stakingTypes = useStakingTypes();
  const tokenNetworks = useTokenNetworks();

  const { address, walletName } = useConnectedData(
    AvailableWriteProviders.ethCompatible,
  );

  const sortedData = useMemo(() => {
    if (!sortKey || !sortOrder) {
      return data;
    }

    return [...data].sort((a: IDeFiItem, b: IDeFiItem) => {
      if (sortOrder === 'asc') {
        return a[sortKey as keyof IDeFiItem].localeCompare(b[sortKey]);
      }
      return b[sortKey as keyof IDeFiItem].localeCompare(a[sortKey]);
    });
  }, [data, sortKey, sortOrder]);

  const renderTableHeadCell = (title: string) => {
    const isSelected = sortKey === title.toLowerCase();

    const handleClick = () => {
      if (!isSelected) {
        setSortKey(title.toLowerCase() as keyof IDeFiItem);
        setSortOrder('asc');
      } else if (sortOrder === 'desc') {
        setSortOrder('asc');
      } else {
        setSortOrder('desc');
      }
    };

    return (
      <ScrollableTable.HeadCell
        sortDirection={isSelected ? sortOrder : null}
        onClick={handleClick}
      >
        {_capitalize(title)}
      </ScrollableTable.HeadCell>
    );
  };

  const onDepositClick = (item: IDeFiItem) => {
    trackClickDefiAggregator({
      assets: item.assets,
      network: item.network,
      protocol: item.protocol,
      type: item.type,
      rewards: item.baseRewards,
      walletType: walletName,
      walletPublicAddress: address,
    });
  };

  return (
    <Box className={styles.root}>
      <ScrollableTable>
        <ScrollableTable.Head>
          <ScrollableTable.HeadRow>
            <ScrollableTable.HeadCell>
              {t('defi.assets')}
            </ScrollableTable.HeadCell>

            {renderTableHeadCell(t('defi.network'))}

            {renderTableHeadCell(t('defi.protocol'))}

            {renderTableHeadCell(t('defi.type'))}

            <ScrollableTable.HeadCell>
              {t('defi.base-rewards')}
            </ScrollableTable.HeadCell>

            <ScrollableTable.HeadCell>
              {t('defi.farming-rewards')}
            </ScrollableTable.HeadCell>
          </ScrollableTable.HeadRow>
        </ScrollableTable.Head>

        <ScrollableTable.Body>
          {sortedData.map(item => {
            const { firstAsset, secondAsset } = parseAssets(item.assets);
            const handleDepositClick = () => onDepositClick(item);
            const typeText = stakingTypes.find(
              ({ value }) => value === item.type,
            )?.label;
            const networkText =
              tokenNetworks.find(({ value }) => value === item.network)
                ?.label ?? '';

            return (
              <ScrollableTable.Row key={uid(item)} className={styles.tr}>
                <ScrollableTable.Cell noWrap>
                  <div className={styles.vertAligned}>
                    <span className={styles.vertAligned}>
                      <TokenIcon
                        className={styles.tokenIcon}
                        name={firstAsset}
                      />

                      {secondAsset && (
                        <TokenIcon
                          className={styles.tokenIcon}
                          name={secondAsset}
                        />
                      )}
                    </span>

                    <span>{item.assets}</span>
                  </div>
                </ScrollableTable.Cell>

                <ScrollableTable.Cell noWrap>
                  <div className={styles.vertAligned}>
                    <Tooltip arrow title={networkText}>
                      <span className={styles.vertAligned}>
                        <NetworkIcon name={item.network} />
                      </span>
                    </Tooltip>
                  </div>
                </ScrollableTable.Cell>

                <ScrollableTable.Cell noWrap>
                  <div className={styles.vertAligned}>
                    <span className={styles.vertAligned}>
                      <img
                        alt={item.protocolIcon}
                        className={styles.tokenIcon}
                        src={item.protocolIcon}
                      />
                    </span>

                    <span>{item.protocolName}</span>
                  </div>
                </ScrollableTable.Cell>

                <ScrollableTable.Cell noWrap>{typeText}</ScrollableTable.Cell>

                <ScrollableTable.Cell noWrap>
                  {item.baseRewards}
                </ScrollableTable.Cell>

                <ScrollableTable.Cell noWrap>
                  <Box className={styles.rewardCell}>
                    <span>{item.farmingRewards}</span>

                    <a
                      href={item.protocolLink}
                      rel="noreferrer"
                      target="_blank"
                      onMouseDown={handleDepositClick}
                      onTouchStart={handleDepositClick}
                    >
                      <Button
                        className={styles.protocolButton}
                        variant="outlined"
                      >
                        {t('defi.deposit')}

                        <div className={styles.shareIcon}>
                          <OutLinkIcon />
                        </div>
                      </Button>
                    </a>
                  </Box>
                </ScrollableTable.Cell>
              </ScrollableTable.Row>
            );
          })}
        </ScrollableTable.Body>
      </ScrollableTable>
    </Box>
  );
};
