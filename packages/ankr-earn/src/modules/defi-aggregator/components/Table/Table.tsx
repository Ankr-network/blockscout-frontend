import { Box } from '@material-ui/core';
import classNames from 'classnames';
import _capitalize from 'lodash/capitalize';
import { useMemo, useState } from 'react';
import { uid } from 'react-uid';

import { t } from 'common';

import { ScrollableTable } from 'modules/common/components/ScrollableTable';
import { Button } from 'uiKit/Button';
import { OutLinkIcon } from 'uiKit/Icons/OutLinkIcon';

import { DeFiItem } from '../../hooks';
import {
  TOKEN_ASSET_ICON_MAP,
  TOKEN_NETWORK_ICON_MAP,
  TOKEN_PROTOCOL_ICON_MAP,
} from '../../utils';

import { useTableStyles } from './useTableStyles';

interface ITableProps {
  data: DeFiItem[];
}

export const Table = ({ data }: ITableProps): JSX.Element => {
  const [sortKey, setSortKey] = useState<keyof DeFiItem | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const styles = useTableStyles();

  const sortedData = useMemo(() => {
    if (!sortKey || !sortOrder) {
      return data;
    }

    return data.sort((a: DeFiItem, b: DeFiItem) => {
      if (sortOrder === 'asc') {
        return a[sortKey as keyof DeFiItem].localeCompare(b[sortKey]);
      }
      return b[sortKey as keyof DeFiItem].localeCompare(a[sortKey]);
    });
  }, [data, sortKey, sortOrder]);

  const renderTableHeadCell = (title: string) => {
    const isSelected = sortKey === title.toLowerCase();

    const handleClick = () => {
      if (!isSelected) {
        setSortKey(title.toLowerCase() as keyof DeFiItem);
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
              {t('defi.rewards')}
            </ScrollableTable.HeadCell>
          </ScrollableTable.HeadRow>
        </ScrollableTable.Head>

        <ScrollableTable.Body>
          {sortedData.map(item => {
            const assets = item.assets.split('/');
            const firstAsset = assets[0];
            const secondAsset = assets[1].match(/[^\s]+/g)?.[0];

            return (
              <ScrollableTable.Row key={uid(item)} className={styles.tr}>
                <ScrollableTable.Cell noWrap>
                  <div className={styles.vertAligned}>
                    <span className={styles.vertAligned}>
                      {TOKEN_ASSET_ICON_MAP[firstAsset]}

                      {secondAsset && (
                        <span
                          className={classNames(
                            styles.vertAligned,
                            styles.secondAssetIcon,
                          )}
                        >
                          {TOKEN_ASSET_ICON_MAP[secondAsset]}
                        </span>
                      )}
                    </span>

                    <span>{item.assets}</span>
                  </div>
                </ScrollableTable.Cell>

                <ScrollableTable.Cell noWrap>
                  <div className={styles.vertAligned}>
                    <span className={styles.vertAligned}>
                      {TOKEN_NETWORK_ICON_MAP[item.network]}
                    </span>

                    <span>{item.network}</span>
                  </div>
                </ScrollableTable.Cell>

                <ScrollableTable.Cell noWrap>
                  <div className={styles.vertAligned}>
                    <span className={styles.vertAligned}>
                      {TOKEN_PROTOCOL_ICON_MAP[item.protocol]}
                    </span>

                    <span>{item.protocol}</span>
                  </div>
                </ScrollableTable.Cell>

                <ScrollableTable.Cell noWrap>{item.type}</ScrollableTable.Cell>

                <ScrollableTable.Cell noWrap>
                  <Box className={styles.rewardCell}>
                    {item.rewardedToken}

                    <a
                      href={item.protocolLink}
                      rel="noreferrer"
                      target="_blank"
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
