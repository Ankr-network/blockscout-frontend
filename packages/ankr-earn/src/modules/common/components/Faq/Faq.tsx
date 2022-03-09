import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Typography,
} from '@material-ui/core';
import { ChangeEvent, ReactChild, RefObject } from 'react';
import { uid } from 'react-uid';

import { ReactComponent as AngleDownIcon } from 'assets/img/angle-down-icon.svg';
import { t } from 'modules/i18n/utils/intl';

import { useFaqStyles as useStyles } from './useFaqStyles';

export interface IFaqItem {
  question: string;
  answer: ReactChild;
  ref?: RefObject<unknown>;
  expanded?: boolean;
  onChange?: (
    event: ChangeEvent<Record<string, unknown>>,
    expanded: boolean,
  ) => void;
}

export interface IFaq {
  data: IFaqItem[];
}

export const Faq = ({ data }: IFaq): JSX.Element => {
  const classes = useStyles();

  const FaqList = data.map((el, i) => (
    <Accordion
      key={uid(i)}
      ref={el.ref}
      expanded={el.expanded}
      onChange={el.onChange}
    >
      <AccordionSummary
        aria-controls={`${i}-faq-content`}
        expandIcon={<AngleDownIcon />}
        id={`${i}-faq-header`}
      >
        {el.question}
      </AccordionSummary>

      <AccordionDetails className={classes.answer}>
        {el.answer}
      </AccordionDetails>
    </Accordion>
  ));

  return (
    <Paper className={classes.box} square={false} variant="outlined">
      <Typography className={classes.title} variant="h2">
        {t('stake.faq-title')}
      </Typography>

      {FaqList}
    </Paper>
  );
};
