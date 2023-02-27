import { ChainLabel } from 'modules/common/components/ChainMainInfo/ChainLabel';
import { useLabel } from './hooks/useLabel';
import { useLabelStyles } from './LabelStyles';

export interface LabelProps {
  isSui: boolean;
}

export const Label = ({ isSui }: LabelProps) => {
  const [label, tooltip] = useLabel(isSui);

  const { classes } = useLabelStyles();

  return (
    <ChainLabel className={classes.root} label={label} tooltip={tooltip} />
  );
};
