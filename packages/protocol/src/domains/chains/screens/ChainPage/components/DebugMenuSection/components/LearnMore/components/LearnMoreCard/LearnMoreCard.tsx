import { Card } from '../../types';
import { CardInfo } from '../CardInfo';
import { CardLink } from '../CardLink';
import { useLearnMoreCardStyles } from './LearnMoreCardStyles';

export interface LearnMoreCardProps {
  card: Card;
}

export const LearnMoreCard = ({ card }: LearnMoreCardProps) => {
  const { Icon, descriptions, link, linkText, title } = card;

  const { classes } = useLearnMoreCardStyles();

  return (
    <div className={classes.root}>
      <Icon className={classes.icon} />
      <CardInfo descriptions={descriptions} title={title} />
      <CardLink address={link} text={linkText} />
    </div>
  );
};
