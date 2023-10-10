import { useHeadRowStyles } from './HeadRowStyles';

interface HeadRowProps {
  headingTitles: string[];
}

export const HeadRow = ({ headingTitles }: HeadRowProps) => {
  const { classes } = useHeadRowStyles();

  return (
    <div className={classes.row}>
      {headingTitles.map(headingTitle => (
        <div key={headingTitle} className={classes.cell}>
          {headingTitle}
        </div>
      ))}

      <div className={classes.cell} />
    </div>
  );
};
