import { useMemo } from 'react';
import { Typography } from '@mui/material';
import { Doc, Globe } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { NavLink } from 'uiKit/NavLink';
import { CardList } from 'modules/common/components/CardList/CardList';

import { PaperBlock } from '../PaperBlock';
import { useProjectFooterStyles } from './useProjectFooterStyles';
import { docsLinks, socialLinks } from './const';

interface ProjectFooterProps {
  className?: string;
}

export const ProjectFooter = ({ className }: ProjectFooterProps) => {
  const { classes, cx } = useProjectFooterStyles();

  const docsListItems = useMemo(
    () =>
      docsLinks.map(({ children, href }) => (
        <NavLink
          key={href}
          className={cx(classes.link, classes.linkItem)}
          href={href}
          children={children}
        />
      )),
    [classes.link, classes.linkItem, cx],
  );

  const socialLinkItems = useMemo(
    () =>
      socialLinks.map(({ children, href, startIcon }) => (
        <NavLink
          key={href}
          className={cx(classes.link, classes.linkItem)}
          href={href}
          startIcon={startIcon}
          children={children}
        />
      )),
    [classes.link, classes.linkItem, cx],
  );

  return (
    <div className={className}>
      <Typography className={classes.title} variant="subtitle1">
        {t('project.footer.title')}
      </Typography>
      <div className={classes.contentWrapper}>
        <PaperBlock className={classes.paperBlock}>
          <CardList
            title={t('project.footer.docs-title')}
            cardHeaderIcon={<Doc color="primary" />}
            listItems={docsListItems}
          />
        </PaperBlock>
        <PaperBlock className={classes.paperBlock}>
          <CardList
            title={t('project.footer.social-links-title')}
            cardHeaderIcon={<Globe color="primary" />}
            listItems={socialLinkItems}
          />
        </PaperBlock>
      </div>
    </div>
  );
};
