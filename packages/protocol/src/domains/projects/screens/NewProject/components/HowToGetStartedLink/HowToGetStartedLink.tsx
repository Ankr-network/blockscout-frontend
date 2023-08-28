import { t } from '@ankr.com/common';

import { PROJECTS_DOCS_LINK } from 'domains/projects/const';

import { HelperLink } from '../HelperLink';

export const HowToGetStartedLink = () => {
  return (
    <HelperLink
      text={t('projects.new-project.helper.link')}
      href={PROJECTS_DOCS_LINK}
    />
  );
};
