import { ReactNode } from 'react';
import { useDialog } from 'modules/common/hooks/useDialog';
import { root } from '../../const';
import { t } from '@ankr.com/common';
import { useWSPlaceHoderStyles } from './useWSPlaceHolderStyles';
import { PremiumLabel } from '../PremiumLabel';
import { PremiumChainDialog } from 'domains/chains/components/PremiumChainDialog';

const label = t(`${root}.endpoints.upgrade-now`);

interface IWsFeatureEndpointsProps {
  title: ReactNode;
}

export const WSPlaceHolder = ({ title }: IWsFeatureEndpointsProps) => {
  const { isOpened, onOpen, onClose } = useDialog();

  const { classes } = useWSPlaceHoderStyles();

  return (
    <div className={classes.root}>
      {title}
      <div
        role="button"
        tabIndex={0}
        className={classes.container}
        onClick={onOpen}
      >
        <PremiumLabel label={label} />
      </div>
      <PremiumChainDialog open={isOpened} onClose={onClose} />
    </div>
  );
};