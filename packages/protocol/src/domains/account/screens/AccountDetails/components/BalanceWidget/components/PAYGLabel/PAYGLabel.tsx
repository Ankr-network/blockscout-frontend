import { t } from '@ankr.com/common';

import { GradientedText } from 'modules/common/components/GradientedText';

import { intlRoot } from '../../const';
import { usePAYGLabelStyles } from './PAYGLabelStyles';

const intlKey = `${intlRoot}.payg-label`;

export const PAYGLabel = () => {
  const { classes } = usePAYGLabelStyles();

  return (
    <div className={classes.root}>
      <GradientedText>{t(intlKey)}</GradientedText>
    </div>
  );
};
