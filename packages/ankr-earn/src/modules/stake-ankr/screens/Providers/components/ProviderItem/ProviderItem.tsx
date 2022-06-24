import { ReactComponent as ClockIcon } from './assets/clock-icon.svg';
import { useProviderItemStyles } from './useProviderItemStyles';

interface IProviderItemProps {
  name: string;
  nodeAmount: number;
  status?: string;
}

export const ProviderItem = ({
  name,
  nodeAmount,
  status,
}: IProviderItemProps): JSX.Element => {
  const classes = useProviderItemStyles();

  // TODO: change conditions and probably add a few new colors
  const renderStatusIcon = (statusValue?: string): JSX.Element => {
    switch (statusValue) {
      case 'green':
        return <div className={classes.greenDot} />;
      case 'orange':
        return <div className={classes.redDot} />;
      default:
        return <ClockIcon />;
    }
  };

  const renderNodeAmount = (value: number): string => {
    return `${value} node${value === 1 ? '' : 's'}`;
  };

  return (
    <div className={classes.root}>
      <div>{renderStatusIcon(status)}</div>

      <div className={classes.infoWrapper}>
        <div>{name}</div>

        <div className={classes.nodeAmount}>{renderNodeAmount(nodeAmount)}</div>
      </div>
    </div>
  );
};
