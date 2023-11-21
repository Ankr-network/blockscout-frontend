import { Button } from '@mui/material';
import { OverlaySpinner } from '@ankr.com/ui';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { ChainsTable as ChainsTableBase } from 'domains/projects/components/ChainsTable';
import { Dialog } from 'uiKit/Dialog';
import { NoResult } from 'modules/common/components/NoResult';
import { getFilteredChainsByName } from 'modules/common/utils/getFilteredChainsByName';
import { useAppSelector } from 'store/useAppSelector';
import { selectNodesDetailsLoadingStatus } from 'modules/chains/store/selectors';

import { ChainSelectModal } from '../ChainSelectModal';
import { useChainStepStyles } from './useChainStepStyles';
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
    isOpened,
    projectChains,
  } = useChainsTable();

  const chains = useMemo(
    () =>
      projectChains.filter(chain =>
        getFilteredChainsByName(chain, searchContent),
      ),
    [projectChains, searchContent],
  );

  const isLoading = useAppSelector(selectNodesDetailsLoadingStatus);

  if (isLoading) return <OverlaySpinner />;

  if (chains.length === 0) {
    return <NoResult />;
  }

  return (
    <>
      <ChainsTableBase chains={chains} columns={columns} />
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
