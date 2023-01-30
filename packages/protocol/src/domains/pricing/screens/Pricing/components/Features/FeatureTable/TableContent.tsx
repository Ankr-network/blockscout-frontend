import { TableCell, TableRow } from '@mui/material';

import { CircleCheck, Cross, Question } from '@ankr.com/ui';
import { t, tHTML } from '@ankr.com/common';
import {
  intlRoot,
  FEATURE_TABLE_ROW,
  IColumnHelper,
  mapTableItem,
  COLUMNS_HELPER,
  HAS_TIP_MESSAGE,
} from './FeatureTableUtils';
import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';
import { useFeatureTableStyles } from './useFeatureTableStyles';

export const TableContent = () => {
  const { classes } = useFeatureTableStyles();

  return (
    <>
      {FEATURE_TABLE_ROW.map(rowIndex => (
        <TableRow key={`rowIndex-${rowIndex}`} className={classes.cellRow}>
          {COLUMNS_HELPER.map((item: IColumnHelper, columnIndex: number) => {
            const text = mapTableItem(item.text, columnIndex);
            const supported = item?.supported
              ? mapTableItem(item.supported, columnIndex)
              : [];
            const unsupported = item?.unsupported
              ? mapTableItem(item.unsupported, columnIndex)
              : [];
            const tipMessage = item?.tipMessage
              ? mapTableItem(item.tipMessage, columnIndex)
              : [];

            return (
              <TableCell key={`index-${columnIndex}`}>
                {text.includes(`${rowIndex}-${columnIndex}`) &&
                  tHTML(
                    `${intlRoot}.body-row.row-${columnIndex + 1}-${
                      rowIndex + 1
                    }`,
                  )}
                {HAS_TIP_MESSAGE &&
                  tipMessage.includes(`${rowIndex}-${columnIndex}`) && (
                    <TooltipWrapper
                      tipIcon={<Question />}
                      className={classes.tip}
                      tooltipText={t(
                        `${intlRoot}.tip.${columnIndex + 1}-${rowIndex + 1}`,
                      )}
                    />
                  )}
                {supported.includes(`${rowIndex}-${columnIndex}`) && (
                  <CircleCheck className={classes.checkIcon} />
                )}
                {unsupported.includes(`${rowIndex}-${columnIndex}`) && (
                  <Cross className={classes.crossIcon} />
                )}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </>
  );
};
