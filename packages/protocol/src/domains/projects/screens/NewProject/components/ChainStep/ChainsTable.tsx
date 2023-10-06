import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Button,
} from '@mui/material';
import { OverlaySpinner } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { Dialog } from 'uiKit/Dialog';
import { getFilteredChainsByName } from 'modules/common/utils/getFilteredChainsByName';
import { NoResult } from 'modules/common/components/NoResult';

import { useChainStepStyles } from './useChainStepStyles';
import { ChainSelectModal } from '../ChainSelectModal';
import { useChainsTable } from './hooks/useChainsTable';

interface IChainsTableProps {
  searchContent: string;
}

export const ChainsTable = ({ searchContent }: IChainsTableProps) => {
  const { classes } = useChainStepStyles();

  const {
    columns,
    currentModalChain,
    handleCloseModal,
    handleConfirmModal,
    isLoading,
    isOpened,
    isUninitialized,
    projectChains,
  } = useChainsTable();

  const chains = useMemo(
    () =>
      projectChains.filter(chain =>
        getFilteredChainsByName(chain, searchContent),
      ),
    [projectChains, searchContent],
  );

  if (isLoading || isUninitialized) return <OverlaySpinner />;

  if (chains.length === 0) {
    return <NoResult />;
  }

  return (
    <>
      <TableContainer className={classes.tableContainer} component="table">
        <TableHead>
          <TableRow>
            {columns.map(({ align, width, field, headerName }) => (
              <TableCell
                key={field}
                className={classes.cell}
                align={align}
                width={width}
              >
                {headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {chains.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column, field) => {
                const { render, align } = column;

                return (
                  <TableCell key={field} align={align} className={classes.cell}>
                    {render(row, index)}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>

      <Dialog
        title={t('projects.new-project.chain-modal.title')}
        titleClassName={classes.dialogTitle}
        open={isOpened}
        paperClassName={classes.dialogPaper}
        onClose={handleCloseModal}
        hasTitleWrapper={false}
      >
        {currentModalChain && (
          <ChainSelectModal selectedChain={currentModalChain}>
            <Button
              fullWidth
              className={classes.modalBtn}
              onClick={handleConfirmModal}
            >
              {t('projects.new-project.chain-modal.btn-confirm')}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              className={classes.modalBtn}
              onClick={handleCloseModal}
            >
              {t('projects.new-project.chain-modal.btn-cancel')}
            </Button>
          </ChainSelectModal>
        )}
      </Dialog>
    </>
  );
};
