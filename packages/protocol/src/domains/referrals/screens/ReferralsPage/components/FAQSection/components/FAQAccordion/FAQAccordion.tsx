import { Accordion, AccordionProps } from '@mui/material';

import { useFAQAccordionStyles } from './useFAQAccordionStyles';

export interface IFAQAccordionProps extends AccordionProps {}

export const FAQAccordion = (props: IFAQAccordionProps) => {
  const { classes } = useFAQAccordionStyles();

  return <Accordion classes={classes} disableGutters {...props} />;
};
