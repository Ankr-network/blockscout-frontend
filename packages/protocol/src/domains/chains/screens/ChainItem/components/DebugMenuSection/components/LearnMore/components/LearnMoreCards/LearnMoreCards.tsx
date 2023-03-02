import { Card } from '../../types';
import { LearnMoreCard } from '../LearnMoreCard';
import { useLearnMoreCardsStyles } from './LearnMoreCardsStyles';

export interface LearnMoreCardsProps {
  cards: Card[];
}

export const LearnMoreCards = ({ cards }: LearnMoreCardsProps) => {
  const { classes } = useLearnMoreCardsStyles();

  return (
    <div className={classes.root}>
      {cards.map(card => (
        <LearnMoreCard card={card} key={card.title} />
      ))}
    </div>
  );
};
