import { LearnMoreCards } from './components/LearnMoreCards';
import { Title } from './components/Title';
import { getCards } from './LearnMoreUtils';
import { useLearnMoreStyles } from './LearnMoreStyles';

export const LearnMore = () => {
  const { classes } = useLearnMoreStyles();

  return (
    <div className={classes.root}>
      <Title />
      <LearnMoreCards cards={getCards()} />
    </div>
  );
};
