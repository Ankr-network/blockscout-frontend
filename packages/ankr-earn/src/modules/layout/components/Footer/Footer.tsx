import { featuresConfig } from 'modules/common/const';
import { TestLink } from 'modules/testing-ui/components/TestLink';
import { Container } from 'uiKit/Container';

import { Rights } from '../Rights';
import { Socials } from '../Socials';
import { SubNavigation } from '../SubNavigation';

import { useFooterStyles } from './useFooterStyles';

export const Footer = (): JSX.Element => {
  const classes = useFooterStyles();

  return (
    <footer>
      <Container className={classes.container} maxWidth="none">
        <Rights className={classes.leftSide} />

        <SubNavigation className={classes.center} />

        <Socials className={classes.rightSide} />
      </Container>

      {featuresConfig.testingUi && <TestLink />}
    </footer>
  );
};
