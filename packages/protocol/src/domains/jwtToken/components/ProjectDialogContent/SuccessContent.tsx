import { t } from '@ankr.com/common';
import { Button } from '@mui/material';

import { jwtTokenIntlRoot } from 'domains/jwtToken/utils/utils';

import { useProjectDialogContentStyles } from './useProjectDialogContentStyles';

interface ISuccessContentProps {
  projectName: string;
  jwtToken: string;
  onClick: () => void;
}

export const SuccessContent = ({
  jwtToken,
  onClick,
  projectName,
}: ISuccessContentProps) => {
  const { classes } = useProjectDialogContentStyles();

  return (
    <div className={classes.success}>
      <div className={classes.group}>
        <div className={classes.row}>
          <span className={classes.name}>
            {t(`${jwtTokenIntlRoot}.success.project-name`)}
          </span>
          <span className={classes.value}>{projectName}</span>
        </div>
        <div className={classes.row}>
          <span className={classes.name}>
            {t(`${jwtTokenIntlRoot}.success.unique-token`)}
          </span>
          <span className={classes.value}>{jwtToken}</span>
        </div>
      </div>
      <Button
        size="large"
        fullWidth
        onClick={onClick}
        className={classes.button}
      >
        {t(`${jwtTokenIntlRoot}.close`)}
      </Button>
    </div>
  );
};
