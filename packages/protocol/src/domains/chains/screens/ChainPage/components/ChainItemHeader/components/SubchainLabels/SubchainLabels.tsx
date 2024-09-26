import { ChainLabel } from 'modules/common/components/ChainMainInfo/ChainLabel';

import { useSubchainLabelsStyles } from './useSubchainLabelsStyles';

interface ISubchainLabelsProps {
  labels: string[];
}

export const SubchainLabels = ({ labels }: ISubchainLabelsProps) => {
  const { classes } = useSubchainLabelsStyles();

  return (
    <>
      {labels.map(label => {
        if (!label) {
          return null;
        }

        return (
          <ChainLabel
            key={label}
            labelClassName={classes.subchainLabel}
            label={label}
          />
        );
      })}
    </>
  );
};
