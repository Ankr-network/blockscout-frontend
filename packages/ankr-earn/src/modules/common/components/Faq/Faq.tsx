import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Typography,
} from '@material-ui/core';
import { ReactComponent as AngleDownIcon } from 'assets/img/angle-down-icon.svg';
import { t } from 'modules/i18n/utils/intl';
import { uid } from 'react-uid';
import { useFaqStyles as useStyles } from './useFaqStyles';

export interface IFaqItem {
  question: string;
  answer: string;
}

export interface IFaq {
  data: IFaqItem[];
}

export const Faq = ({ data }: IFaq) => {
  const classes = useStyles();

  const FaqList = data.map((el, i) => (
    <Accordion key={uid(i)}>
      <AccordionSummary
        expandIcon={<AngleDownIcon />}
        aria-controls={`${i}-faq-content`}
        id={`${i}-faq-header`}
      >
        {t(el.question)}
      </AccordionSummary>
      <AccordionDetails>{t(el.answer)}</AccordionDetails>
    </Accordion>
  ));

  return (
    <Paper className={classes.box} variant="outlined" square={false}>
      <Typography variant="h2" className={classes.title}>
        {t('stake.faq-title')}
      </Typography>
      {FaqList}
    </Paper>
  );
};
