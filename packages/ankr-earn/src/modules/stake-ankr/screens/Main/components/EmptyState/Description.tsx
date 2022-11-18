import { t } from '@ankr.com/common';
import classNames from 'classnames';

import { ReactComponent as AnkrLogo } from './assets/ankr-logo.svg';
import { ReactComponent as DaoLogo } from './assets/dao-logo.svg';
import { ReactComponent as EarthLogo } from './assets/earth-logo.svg';
import { ReactComponent as NodeLogo } from './assets/node-logo.svg';
import { DescriptionItem, IDescriptionItemProps } from './DescriptionItem';
import { useEmptyStateStyles } from './useEmptyStateStyles';

export const Description = (): JSX.Element => {
  const classes = useEmptyStateStyles();

  const items: IDescriptionItemProps[] = [
    {
      iconSlot: <AnkrLogo />,
      description: t('stake-ankr.empty-state.description-1'),
    },
    {
      iconSlot: <NodeLogo />,
      description: t('stake-ankr.empty-state.description-2'),
    },
    {
      iconSlot: <EarthLogo />,
      description: t('stake-ankr.empty-state.description-3'),
    },
    {
      iconSlot: <DaoLogo />,
      description: t('stake-ankr.empty-state.description-4'),
      isComingSoon: true,
    },
  ];

  return (
    <div className={classNames(classes.statisticWrapper, classes.wrapper)}>
      {items.map(x => (
        <DescriptionItem
          key={x.description}
          description={x.description}
          iconSlot={x.iconSlot}
          isComingSoon={x.isComingSoon}
        />
      ))}
    </div>
  );
};
