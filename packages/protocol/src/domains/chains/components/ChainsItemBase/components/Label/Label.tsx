import { ChainLabel } from 'modules/common/components/ChainMainInfo/ChainLabel';
import { useLabelStyles } from './LabelStyles';

export interface LabelProps {
  label: string;
  tooltip: string;
  isStatusIndicatorVisible: boolean;
}

export const Label = ({
  label,
  tooltip,
  isStatusIndicatorVisible,
}: LabelProps) => {
  const { classes } = useLabelStyles();

  return (
    <ChainLabel
      className={classes.root}
      label={label}
      tooltip={tooltip}
      isStatusIndicatorVisible={isStatusIndicatorVisible}
    />
  );
};
