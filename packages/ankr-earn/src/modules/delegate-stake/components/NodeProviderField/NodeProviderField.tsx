import { Box } from '@material-ui/core';
import classNames from 'classnames';
import { ReactText } from 'react';
import { Field } from 'react-final-form';

import { t } from 'common';

import { getErrorText, hasError } from 'modules/common/utils/form';
import { StakeDescriptionName } from 'modules/stake/components/StakeDescriptionName';
import { NavLink } from 'uiKit/NavLink';

import { EFieldsNames } from '../StakeForm/const';

import { ReactComponent as AngleRightIcon } from './assets/angle-right.svg';
import { useNodeProviderFieldStyles } from './useNodeProviderFieldStyles';

interface INodeProviderFieldProps {
  isDisabled?: boolean;
  providerName?: string;
  providerSelectHref?: string;
  mt?: number;
}

export const NodeProviderField = ({
  isDisabled,
  providerName,
  providerSelectHref = '',
  mt = 0,
}: INodeProviderFieldProps): JSX.Element => {
  const classes = useNodeProviderFieldStyles();

  const validateSelectProvider = (value?: ReactText) => {
    if (!value) {
      return t('validation.required');
    }
    return undefined;
  };

  return (
    <Field name={EFieldsNames.provider} validate={validateSelectProvider}>
      {({ input, meta }) => {
        const isError = hasError(meta);

        const isProviderExists =
          !!input.value?.toString().length && !!providerName;

        return (
          <Box mt={mt}>
            <input {...input} hidden />

            <Box mb={1}>
              <StakeDescriptionName
                className={classNames(
                  isError && classes.selectProviderErrorColor,
                )}
              >
                {t('stake-ankr.staking.provider-label')}
              </StakeDescriptionName>
            </Box>

            <NavLink
              className={classNames(
                classes.selectProviderBtn,
                providerName && classes.selectProviderBtnActive,
              )}
              disabled={isDisabled || !providerSelectHref}
              href={providerSelectHref}
              variant="outlined"
            >
              {isProviderExists
                ? providerName
                : t('stake-ankr.staking.provider-placeholder')}

              {!isDisabled && (
                <AngleRightIcon className={classes.selectProviderIcon} />
              )}
            </NavLink>

            {isError && (
              <div
                className={classNames(
                  classes.selectProviderError,
                  classes.selectProviderErrorColor,
                )}
              >
                {getErrorText(meta)}
              </div>
            )}
          </Box>
        );
      }}
    </Field>
  );
};
