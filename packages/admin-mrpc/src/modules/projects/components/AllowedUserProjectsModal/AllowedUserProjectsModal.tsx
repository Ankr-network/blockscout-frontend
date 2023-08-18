import { ChangeEvent } from 'react';
import { Button, Input, Typography } from '@mui/material';

import { t } from 'modules/i18n/utils/intl';

import { useAllowedUserProjectsModalStyles } from './AllowedProjectsModalStyles';

interface AllowedUserProjectsModalProps {
  onInputJwtLimitChange: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  jwtLimit: string;
  onSetJwtLimit: () => void;
  isLoading: boolean;
}

export const AllowedUserProjectsModal = ({
  onInputJwtLimitChange,
  jwtLimit,
  onSetJwtLimit,
  isLoading,
}: AllowedUserProjectsModalProps) => {
  const { classes } = useAllowedUserProjectsModalStyles();

  const isSubmitDisabled = isLoading || !jwtLimit || Number(jwtLimit) <= 0;

  return (
    <div className={classes.modalContent}>
      <Typography variant="h6">{t('projects.modal.title')}</Typography>
      <Input
        type="number"
        fullWidth
        name="jwtLimit"
        id="jwtLimit"
        placeholder={t('projects.modal.placeholder')}
        disabled={isLoading}
        value={jwtLimit}
        onChange={onInputJwtLimitChange}
      />
      <Button fullWidth onClick={onSetJwtLimit} disabled={isSubmitDisabled}>
        {t('projects.modal.submit-button')}
      </Button>
    </div>
  );
};
