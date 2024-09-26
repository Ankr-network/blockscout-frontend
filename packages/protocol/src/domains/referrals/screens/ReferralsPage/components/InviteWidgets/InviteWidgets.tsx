import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import check from './assets/check.png';
import coins from './assets/coins.png';
import people from './assets/people.png';
import { CopyReferralLinkButton } from '../CopyReferralLinkButton';
import { InviteWidget } from '../InviteWidget';
import { Section } from '../Section';
import { inviteWidgetsTranslation } from './translation';
import { useInviteWidgetsStyles } from './useInviteWidgetsStyles';

export const InviteWidgets = () => {
  const { classes } = useInviteWidgetsStyles();
  const { keys, t } = useTranslation(inviteWidgetsTranslation);

  return (
    <Section classes={classes} title={t(keys.title)}>
      <InviteWidget
        description={t(keys.step1.description)}
        image={check}
        title={t(keys.step1.title)}
        button={<CopyReferralLinkButton />}
      />
      <InviteWidget
        description={t(keys.step2.description)}
        image={people}
        title={t(keys.step2.title)}
      />
      <InviteWidget
        description={t(keys.step3.description)}
        image={coins}
        title={t(keys.step3.title)}
      />
    </Section>
  );
};
