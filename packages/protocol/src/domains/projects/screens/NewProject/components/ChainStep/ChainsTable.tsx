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

import { Dialog } from 'uiKit/Dialog';

import { useChainStepStyles } from './useChainStepStyles';
import { ChainSelectModal } from '../ChainSelectModal';
import { useChainsTable } from './hooks/useChainsTable';

export const ChainsTable = () => {
  const { classes } = useChainStepStyles();

  const {
    isLoading,
    columns,
    projectChains,
    isOpened,
    currentModalChain,
    handleCloseModal,
  } = useChainsTable();

  if (isLoading) return <OverlaySpinner />;

  return (
    <>
      <TableContainer className={classes.tableContainer} component="table">
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell
                key={column.field}
                className={classes.cell}
                {...column}
              >
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {projectChains.map((row, index) => (
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
        onClose={handleCloseModal}
      >
        {currentModalChain && (
          <ChainSelectModal selectedChain={currentModalChain}>
            <Button
              className={classes.modalBtn}
              fullWidth
              onClick={handleCloseModal}
            >
              {t('projects.new-project.chain-modal.btn-confirm')}
            </Button>
          </ChainSelectModal>
        )}
      </Dialog>
    </>
  );
};
