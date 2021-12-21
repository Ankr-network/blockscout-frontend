import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Typography,
} from '@material-ui/core';
import { t } from 'modules/i18n/utils/intl';
import { useFaqStyles as useStyles } from './useFaqStyles';
import { ReactComponent as AngleDownIcon } from 'assets/img/angle-down-icon.svg';

export interface IFaq {
  data: Record<string, string>[];
}

export const Faq = ({ data }: IFaq) => {
  const classes = useStyles();

  const FaqList = data.map(el => (
    <Accordion>
      <AccordionSummary
        expandIcon={<AngleDownIcon />}
        aria-controls={`${el.question}-content`}
        id={`${el.question}-header`}
      >
        {t(el.question)}
      </AccordionSummary>
      <AccordionDetails>{t(el.answer)}</AccordionDetails>
    </Accordion>
  ));

  return (
    <Paper className={classes.box} variant="outlined" square={false}>
      <Typography variant="h2" className={classes.title}>
        {t('stake.faq.title')}
      </Typography>
      {FaqList}
    </Paper>
  );
};
