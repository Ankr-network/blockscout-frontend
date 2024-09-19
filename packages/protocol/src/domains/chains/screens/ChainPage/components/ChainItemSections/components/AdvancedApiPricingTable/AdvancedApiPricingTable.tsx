import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { pricingTranslation } from './translation';
import { useAdvancedApiPricingTableStyles } from './useAdvancedApiPricingTableStyles';

export const AdvancedApiPricingTable = () => {
  const { classes } = useAdvancedApiPricingTableStyles();

  const { keys, t } = useTranslation(pricingTranslation);

  return (
    <Table className={classes.pricingTable}>
      <TableHead className={classes.pricingTableHeader}>
        <TableRow>
          <TableCell className={classes.pricingTableCell}>
            {t(keys.header.method)}
          </TableCell>
          <TableCell className={classes.pricingTableCell}>
            {t(keys.header.apiCredits)}
          </TableCell>
          <TableCell className={classes.pricingTableCell}>
            {t(keys.header.usd)}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell className={classes.pricingTableCell}>
            <Link
              target="_blank"
              className={classes.pricingLink}
              href={t(keys.method.link)}
            >
              {t(keys.method.text)}
            </Link>
          </TableCell>
          <TableCell className={classes.pricingTableCell}>
            {t(keys.apiCredits)}
          </TableCell>
          <TableCell className={classes.pricingTableCell}>
            {t(keys.usd)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
