import { useCardInfoStyles } from './CardInfoStyles';

export interface CardInfoProps {
  descriptions: string[];
  title: string;
}

export const CardInfo = ({ descriptions, title }: CardInfoProps) => {
  const { classes } = useCardInfoStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>{title}</div>
      <div className={classes.descriptions}>
        {descriptions.map(description => (
          <div className={classes.description} key={description}>
            {description}
          </div>
        ))}
      </div>
    </div>
  );
};
