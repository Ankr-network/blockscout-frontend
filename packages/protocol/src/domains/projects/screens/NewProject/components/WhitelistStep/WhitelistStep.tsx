import { Typography } from '@mui/material';
import { UserEndpointTokenMode } from 'multirpc-sdk';
import { t, tHTML } from '@ankr.com/common';
import { useCallback, useMemo } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';
import {
  AddToWhitelistFormData,
  WhitelistStepFields,
} from 'domains/projects/store';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { NewProjectStep } from 'domains/projects/types';
import { WhitelistItemsCounters } from 'domains/projects/components/WhitelistItemsCounters';
import { useOnMount } from 'modules/common/hooks/useOnMount';

import { useWhitelistStepStyles } from './useWhitelistStepStyles';
import { Table } from './components/Table/Table';
import { AddToWhitelistDialog } from './components/AddToWhitelistDialog';
import { useWhitelistData } from './useWhitelistData';
import { useProjectFormValues } from '../../hooks/useProjectFormValues';
import { EmptyList } from './components/EmptyList';
import { AddWhitelistMenuButton } from './components/AddWhitelistMenuButton';

export const WhitelistStep = () => {
  const { classes } = useWhitelistStepStyles();

  const {
    isOpened: isAddToWhitelistDialogOpened,
    onClose: onAddToWhitelistDialogClose,
    onOpen: onAddToWhitelistDialogOpen,
  } = useDialog();

  const { allSelectedChainIds, onChange, whitelistItems } =
    useProjectFormValues();
  const { handleSetStepConfig } = useProjectConfig();

  const {
    data,
    isAddingDomainAllowed,
    isAddingIPAllowed,
    isAddingSmartContractAllowed,
  } = useWhitelistData();

  const handleOpenAddWhitelist = useCallback(() => {
    onChange(WhitelistStepFields.isEditingWhitelistDialog, false);
    onAddToWhitelistDialogOpen();
  }, [onChange, onAddToWhitelistDialogOpen]);

  useOnMount(() => {
    const updatedWhitelistItems = (
      whitelistItems as AddToWhitelistFormData[]
    ).filter(item =>
      item.chains?.every(chain => allSelectedChainIds.includes(chain)),
    );

    onChange(WhitelistStepFields.whitelistItems, updatedWhitelistItems);
    handleSetStepConfig(
      NewProjectStep.Whitelist,
      {
        whitelistItems: updatedWhitelistItems,
      },
      NewProjectStep.Chains,
    );
  });

  const isAddingDomainDisabled = useMemo(
    () => !isAddingDomainAllowed,
    [isAddingDomainAllowed],
  );
  const isAddingIPDisabled = useMemo(
    () => !isAddingIPAllowed,
    [isAddingIPAllowed],
  );
  const isAddingSmartContractDisabled = useMemo(
    () => !isAddingSmartContractAllowed,
    [isAddingSmartContractAllowed],
  );

  const refererCounts = useMemo(
    () =>
      whitelistItems.filter(item => item.type === UserEndpointTokenMode.REFERER)
        .length,
    [whitelistItems],
  );

  const ipsCounts = useMemo(
    () =>
      whitelistItems.filter(item => item.type === UserEndpointTokenMode.IP)
        .length,
    [whitelistItems],
  );

  const addressesCounts = useMemo(
    () =>
      whitelistItems.filter(item => item.type === UserEndpointTokenMode.ADDRESS)
        .length,
    [whitelistItems],
  );

  return (
    <>
      {data.length === 0 ? (
        <EmptyList
          isAddingDomainDisabled={isAddingDomainDisabled}
          isAddingIPDisabled={isAddingIPDisabled}
          isAddingSmartContractDisabled={isAddingSmartContractDisabled}
          onWhitelistDialogOpen={onAddToWhitelistDialogOpen}
        />
      ) : (
        <>
          <Typography className={classes.title} variant="h6">
            {t('projects.new-project.step-3.title')}
          </Typography>
          <Typography variant="body2" component="p" className={classes.plug}>
            {tHTML('projects.new-project.step-3.plug')}
          </Typography>
          <WhitelistItemsCounters
            className={classes.counters}
            domainsCount={refererCounts}
            ipsCount={ipsCounts}
            smartContractsCount={addressesCounts}
          />
          <Table
            data={data}
            onWhitelistDialogOpen={onAddToWhitelistDialogOpen}
          />
          <AddWhitelistMenuButton
            isSetupMode={false}
            isAddingDomainDisabled={isAddingDomainDisabled}
            isAddingIPDisabled={isAddingIPDisabled}
            isAddingSmartContractDisabled={isAddingSmartContractDisabled}
            onWhitelistDialogOpen={handleOpenAddWhitelist}
          />
        </>
      )}
      <AddToWhitelistDialog
        isOpen={isAddToWhitelistDialogOpened}
        onClose={onAddToWhitelistDialogClose}
      />
    </>
  );
};
