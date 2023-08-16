import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';
import { Field, useForm } from 'react-final-form';
import { t, tHTML } from '@ankr.com/common';
import { useCallback, useMemo } from 'react';

import { OnChange } from 'modules/form/utils/OnChange';
import { getChainName } from 'uiKit/utils/metatags';
import { ChainID } from 'domains/chains/types';
import { isEVMBased } from 'domains/chains/utils/isEVMBased';
import { WhiteListItem } from 'domains/projects/types';

import { InputAddressField } from '../InputAddressField';
import { useAddToWhitelistFormStyles } from './useAddAndEditWhitelistItemFormStyles';
import {
  getValidation,
  getOptionsByWhitelistTypes,
  AddToWhitelistFormFields,
} from './AddToWhitelistFormUtils';
import { ChainItem } from '../ChainItem';
import { SelectTypeField } from '../SelectTypeField';
import { useWhitelistData } from '../../../../useWhitelistData';

interface MainFormProps {
  chainIds: ChainID[];
  shouldSkipFormReset?: boolean;
  handleSubmit: () => void;
}

export const MainForm = ({
  chainIds,
  shouldSkipFormReset,
  handleSubmit,
}: MainFormProps) => {
  const { classes, cx } = useAddToWhitelistFormStyles();

  const { change, getState } = useForm();
  const { values, valid } = getState();
  const selectedType = values?.whitelistDialog?.type;

  const isTypeSelected = Boolean(selectedType);
  const isSmartContractAddressSelected = selectedType === WhiteListItem.address;
  const isValueFilled = Boolean(values?.whitelistDialog?.value);
  const isAtLeastOneChainSelected = values?.whitelistDialog?.chains?.length > 0;

  const isFormFilled =
    isTypeSelected && isAtLeastOneChainSelected && isValueFilled;

  const {
    isAddingDomainAllowed,
    isAddingIPAllowed,
    isAddingSmartContractAllowed,
  } = useWhitelistData();

  const selectOptions = useMemo(
    () =>
      getOptionsByWhitelistTypes({
        isAddingDomainAllowed,
        isAddingIPAllowed,
        isAddingSmartContractAllowed,
      }),
    [isAddingDomainAllowed, isAddingIPAllowed, isAddingSmartContractAllowed],
  );

  const preparedChainIds = useMemo(
    () =>
      chainIds.filter(chainId =>
        isSmartContractAddressSelected ? isEVMBased(chainId) : true,
      ),
    [chainIds, isSmartContractAddressSelected],
  );

  const handleChange = useCallback(() => {
    if (shouldSkipFormReset) return;

    if (values?.whitelistDialog?.chains)
      change(AddToWhitelistFormFields.chains, undefined);
    if (values?.whitelistDialog?.value)
      change(AddToWhitelistFormFields.value, undefined);
  }, [
    change,
    shouldSkipFormReset,
    values?.whitelistDialog?.chains,
    values?.whitelistDialog?.value,
  ]);

  return (
    <form onSubmit={handleSubmit}>
      <OnChange name={AddToWhitelistFormFields.type}>{handleChange}</OnChange>

      <FormControl className={cx(classes.formWrapper, classes.selectWrapper)}>
        <InputLabel className={classes.label}>
          {t('projects.add-whitelist-dialog.select-type')}
        </InputLabel>
        <Field
          name={AddToWhitelistFormFields.type}
          key={AddToWhitelistFormFields.type}
          component={SelectTypeField}
          variant="outlined"
          options={selectOptions}
          isTypeSelected={isTypeSelected}
        />
      </FormControl>

      <FormControl className={cx(classes.formWrapper, classes.inputWrapper)}>
        <InputAddressField
          name={AddToWhitelistFormFields.value}
          isDisabled={!isTypeSelected}
          placeholder={t('projects.add-whitelist-dialog.enter')}
          validate={getValidation(selectedType)}
        />
      </FormControl>

      {values?.whitelistDialog?.value && valid && (
        <>
          <Typography component="p" className={classes.chainsTitle}>
            {t('projects.add-whitelist-dialog.select-chain')}
          </Typography>

          <Typography component="p" className={classes.description}>
            {tHTML('projects.add-whitelist-dialog.select-chain-description')}
          </Typography>

          <Divider className={classes.divider} />

          <FormControl
            className={cx(classes.formWrapper, classes.inputWrapper)}
          >
            {preparedChainIds.map(chainId => (
              <Field
                name={AddToWhitelistFormFields.chains}
                key={chainId}
                label={getChainName(chainId)}
                value={chainId}
                disabled={
                  isSmartContractAddressSelected && isAtLeastOneChainSelected
                }
                component={ChainItem}
                type="checkbox"
                className={classes.chainWrapper}
              />
            ))}
          </FormControl>
        </>
      )}

      <Button
        fullWidth
        size="large"
        disabled={!isFormFilled || !valid}
        className={classes.submitButton}
        onClick={handleSubmit}
      >
        {t('projects.add-whitelist-dialog.confirm')}
      </Button>
    </form>
  );
};
