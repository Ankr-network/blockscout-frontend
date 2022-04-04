import { Button, ButtonProps } from '@material-ui/core';
import classNames from 'classnames';
import { useStyles } from './LoadableButtonStyles';
import { LoadableButtonLoader } from './LoadableButtonUtils';

export interface LoadableButtonProps extends ButtonProps {
  loading?: boolean;
  loader?: JSX.Element;
}

export const LoadableButton = ({
  loading,
  children,
  loader: _loader,
  ...rest
}: LoadableButtonProps) => {
  const classes = useStyles();
  const loader = _loader || <LoadableButtonLoader />;

  return (
    <Button {...rest}>
      {loading && <div className={classes.loaderWrapper}>{loader}</div>}
      <div className={classNames({ [classes.hidden]: loading })}>
        {children}
      </div>
    </Button>
  );
};
