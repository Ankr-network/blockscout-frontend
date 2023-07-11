import { useForm } from 'react-final-form';
import { Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';

import { ChainItem } from '../ChainItem';
import { WhitelistContractAddressField } from './WhitelistContractAddressField';
import { useWhitelist } from './useWhitelist';
import { useWhitelistStepStyles } from './useWhitelistStepStyles';
import { NewProjectFormValues } from '../NewProjectForm/NewProjectFormTypes';

export const WhitelistStep = () => {
  const { classes } = useWhitelistStepStyles();
  const { chain } = useWhitelist();
  const { getState } = useForm<NewProjectFormValues>();
  const {
    values: { chainType },
  } = getState();

  return (
    <>
      <Typography className={classes.title} variant="h6">
        {t('projects.new-project.step-2.title')}
      </Typography>
      {chain && (
        <div className={classes.chainItemWrapper}>
          <ChainItem chain={chain} chainType={chainType} />
        </div>
      )}
      <Typography variant="body2" component="p" className={classes.plug}>
        {tHTML('projects.new-project.step-2.plug')}
      </Typography>

      <WhitelistContractAddressField />
    </>
  );
};
