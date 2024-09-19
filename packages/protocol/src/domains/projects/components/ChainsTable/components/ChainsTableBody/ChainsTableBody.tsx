import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Chain, ChainID } from '@ankr.com/chains-list';

import { fallbackChain } from 'domains/dashboard/screens/Dashboard/const';

import { ChainsTableColumn } from '../../types';
import { useChainsTableStyles } from './useChainsTableBodyStyles';

export interface ChainsTableBodyProps {
  cellClassName: string;
  chains: Chain[];
  columns: ChainsTableColumn[];
}

const ALL_CHAINS_SELECTOR_ROW_INDEX = -1;

export const ChainsTableBody = ({
  cellClassName,
  chains,
  columns,
}: ChainsTableBodyProps) => {
  const allChainsSelectorItem = {
    ...fallbackChain,
    id: ChainID.ALL_CHAINS,
    name: '',
  };

  const allChainsSelectorRow = {
    chain: allChainsSelectorItem,
    index: ALL_CHAINS_SELECTOR_ROW_INDEX,
    allChains: chains,
  };

  const { classes, cx } = useChainsTableStyles();

  return (
    <>
      <TableHead>
        <TableRow>
          {columns.map(({ align, field, headerName, width }) => (
            <TableCell
              align={align}
              className={cx(cellClassName, classes.headerCell)}
              key={field}
              width={width}
            >
              {field === 'chain' && (
                <div className={classes.allChainsSelector}>
                  {columns[0].render(allChainsSelectorRow)}
                </div>
              )}
              {headerName}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {chains.map((chain, index) => (
          <TableRow key={index}>
            {columns.map(({ align, render }, field) => (
              <TableCell key={field} align={align} className={cellClassName}>
                {render({ chain, index, allChains: chains })}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};
