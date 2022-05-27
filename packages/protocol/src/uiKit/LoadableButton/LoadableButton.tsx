import { Button } from '@material-ui/core';
import classNames from 'classnames';

import { useStyles } from './LoadableButtonStyles';
import { LoadableButtonLoader } from './LoadableButtonUtils';
import { LoadableButtonProps } from './types';

export const LoadableButton = <Element, Props>({
  loading,
  children,
  loader: _loader,
  ...rest
}: LoadableButtonProps<Element, Props>) => {
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
