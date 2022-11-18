import { t } from '@ankr.com/common';
import { Box, Container, Typography } from '@material-ui/core';
import classNames from 'classnames';

import { Dialog } from 'uiKit/Dialog';
import { ExternalLinkIcon } from 'uiKit/Icons/ExternalLinkIcon';
import { NavLink } from 'uiKit/NavLink';
import { Quote } from 'uiKit/Quote';

import { ArticleNumber } from './ArticleNumber';
import { ReactComponent as Graph } from './assets/graph.svg';
import { useHowItWorksDialogStyles } from './useHowItWorksDialogStyles';

interface IHowItWorksDialogProps {
  open: boolean;
  nodeProviderLink: string;
  docsLink?: string;
  onClose?: () => void;
}

export const HowItWorksDialog = ({
  open,
  nodeProviderLink,
  docsLink,
  onClose,
}: IHowItWorksDialogProps): JSX.Element => {
  const classes = useHowItWorksDialogStyles();

  return (
    <Dialog className={classes.root} open={open} onClose={onClose}>
      <Container
        className={classes.container}
        data-testid="how-it-works-dialog"
      >
        <Typography className={classes.header} variant="h3">
          {t('stake-ankr.how-it-works.header')}
        </Typography>

        <Typography align="left" className={classes.article}>
          {t('stake-ankr.how-it-works.description')}
        </Typography>

        <Box className={classes.block}>
          <ArticleNumber value={1} />

          <Typography align="left" className={classes.title} variant="h4">
            {t('stake-ankr.how-it-works.title-1')}
          </Typography>
        </Box>

        <Box paddingLeft={6}>
          <Typography align="left" className={classes.article}>
            {t('stake-ankr.how-it-works.article-1')}
          </Typography>
        </Box>

        <Graph className={classes.graph} />

        <Box className={classes.block}>
          <ArticleNumber value={2} />

          <Typography align="left" className={classes.title} variant="h4">
            {t('stake-ankr.how-it-works.title-2')}
          </Typography>
        </Box>

        <Box paddingLeft={6}>
          <Typography align="left" className={classes.article}>
            {t('stake-ankr.how-it-works.article-2')}
          </Typography>
        </Box>

        <Box className={classes.block}>
          <ArticleNumber value={3} />

          <Typography align="left" className={classes.title} variant="h4">
            {t('stake-ankr.how-it-works.title-3')}
          </Typography>
        </Box>

        <Box paddingLeft={6}>
          <Typography align="left" className={classes.article}>
            {t('stake-ankr.how-it-works.article-3')}
          </Typography>
        </Box>

        <Quote mt={1} textAlign="left">
          {t('stake-ankr.how-it-works.info')}
        </Quote>

        <Box className={classes.footerBtn}>
          <NavLink
            className={classes.button}
            href={nodeProviderLink}
            size="large"
            variant="contained"
          >
            {t('stake-ankr.how-it-works.choose-provider')}
          </NavLink>

          {docsLink && (
            <NavLink
              className={classNames(classes.button, classes.docsButton)}
              href={docsLink}
              size="large"
              variant="outlined"
            >
              {t('stake-ankr.how-it-works.view-docs')}

              <Box marginLeft={0.5}>
                <ExternalLinkIcon htmlColor="inherit" />
              </Box>
            </NavLink>
          )}
        </Box>
      </Container>
    </Dialog>
  );
};
