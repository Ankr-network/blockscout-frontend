import { Paper, Typography } from '@material-ui/core';
import classNames from 'classnames';

import { useStyles } from './useFeatureBlockStyles';
import { ReactComponent as PlusIcon } from 'uiKit/Icons/plus.svg';

interface FeatureBlockProps {
  title: string;
  fullDescription?: string;
  className?: string;
}

export const FeatureBlock = ({
  title,
  fullDescription,
  className,
}: FeatureBlockProps) => {
  const classes = useStyles();

  return (
    <Paper className={classNames(classes.root, className)}>
      <div className={classes.container}>
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        {fullDescription && (
          <PlusIcon fontSize={22} className={classes.plusIcon} />
        )}
        <Typography className={classes.fullDescription} variant="subtitle1">
          {fullDescription}
        </Typography>
      </div>
    </Paper>
  );
};
