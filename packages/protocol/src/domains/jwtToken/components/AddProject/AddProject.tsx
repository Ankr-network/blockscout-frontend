import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { Plus } from '@ankr.com/ui';
import { useAddProjectStyles } from './useAddProjectStyles';
import { jwtTokenIntlRoot } from 'domains/jwtToken/utils/utils';

interface IAddProjectProps {
  onOpen: () => void;
}

export const AddProject = ({ onOpen }: IAddProjectProps) => {
  const { classes } = useAddProjectStyles();

  return (
    <div className={classes.root} role="button" tabIndex={0} onClick={onOpen}>
      <Typography component="div" noWrap className={classes.title}>
        {t(`${jwtTokenIntlRoot}.add-new-project`)}
      </Typography>
      <div className={classes.button}>
        <Plus />
      </div>
    </div>
  );
};
