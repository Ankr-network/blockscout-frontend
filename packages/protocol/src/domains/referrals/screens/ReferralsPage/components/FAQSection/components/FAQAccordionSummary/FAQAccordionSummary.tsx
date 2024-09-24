import {
  AccordionSummary,
  AccordionSummaryProps,
  Typography,
} from '@mui/material';
import { Plus } from '@ankr.com/ui';

import { useFAQAccordionSummaryStyles } from './useFAQAccordionSummaryStyles';

export interface IFAQAccordionSummaryProps extends AccordionSummaryProps {}

export const FAQAccordionSummary = ({
  children,
  ...props
}: IFAQAccordionSummaryProps) => {
  const { classes } = useFAQAccordionSummaryStyles();

  return (
    <AccordionSummary classes={classes} {...props}>
      <Plus color="primary" />
      <Typography variant="body2">{children}</Typography>
    </AccordionSummary>
  );
};
