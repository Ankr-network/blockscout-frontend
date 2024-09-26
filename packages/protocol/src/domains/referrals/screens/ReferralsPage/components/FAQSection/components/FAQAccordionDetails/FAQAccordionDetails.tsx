import {
  AccordionDetails,
  AccordionDetailsProps,
  Typography,
} from '@mui/material';

import { useFAQAccordionDetailsStyles } from './useFAQAccordionDetailsStyles';

export interface IFAQAccordionDetailsProps extends AccordionDetailsProps {}

export const FAQAccordionDetails = ({
  children,
  ...props
}: IFAQAccordionDetailsProps) => {
  const { classes } = useFAQAccordionDetailsStyles();

  return (
    <AccordionDetails classes={classes} {...props}>
      <Typography variant="body2">{children}</Typography>
    </AccordionDetails>
  );
};
