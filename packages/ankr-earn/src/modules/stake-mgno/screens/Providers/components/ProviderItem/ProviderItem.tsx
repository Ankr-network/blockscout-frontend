import { t } from 'common';

import { useProviderItemStyles } from './useProviderItemStyles';

interface IProviderItemProps {
  name: string;
  keys: number;
}

export const ProviderItem = ({
  name,
  keys,
}: IProviderItemProps): JSX.Element => {
  const classes = useProviderItemStyles();

  return (
    <div className={classes.root}>
      <div className={classes.infoWrapper}>
        {name}

        <div className={classes.keyAmount}>
          {t('stake-mgno.provider.keys-value', {
            value: keys,
          })}
        </div>
      </div>
    </div>
  );
};
