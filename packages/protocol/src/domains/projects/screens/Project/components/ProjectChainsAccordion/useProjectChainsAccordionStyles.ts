import { makeStyles } from 'tss-react/mui';

export const useProjectChainsAccordionStyles = makeStyles()(theme => ({
  expandButton: { margin: `${theme.spacing(5)} auto 0 auto`, display: `block` },
}));
