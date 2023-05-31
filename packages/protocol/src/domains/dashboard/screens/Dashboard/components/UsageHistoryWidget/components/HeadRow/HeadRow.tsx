import { getText } from '../../utils/text';
import { useHeadRowStyles } from './HeadRowStyles';

export const HeadRow = () => {
  const { classes } = useHeadRowStyles();

  return (
    <>
      <div className={classes.cell}>{getText('month')}</div>
      <div className={classes.cell}>{getText('calls')}</div>
      <div className={classes.cell} />
    </>
  );
};
