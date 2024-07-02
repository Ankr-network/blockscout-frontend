import { Button } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { backButtonTranslation } from './translation';

export interface IBackButtonProps {
  onClick: () => void;
}

export const BackButton = ({ onClick }: IBackButtonProps) => {
  const { keys, t } = useTranslation(backButtonTranslation);

  return (
    <Button color="primary" onClick={onClick} size="medium" variant="outlined">
      {t(keys.text)}
    </Button>
  );
};
