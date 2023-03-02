import { LearnMoreCards } from './components/LearnMoreCards';
import { Title } from './components/Title';
import { cards } from './const';
import { useLearnMoreStyles } from './LearnMoreStyles';

export const LearnMore = () => {
  const { classes } = useLearnMoreStyles();

  return (
    <div className={classes.root}>
      <Title />
      <LearnMoreCards cards={cards} />
    </div>
  );
};
