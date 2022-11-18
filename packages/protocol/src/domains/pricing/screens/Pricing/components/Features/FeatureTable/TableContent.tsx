import { TableCell, TableRow } from '@material-ui/core';

import { ReactComponent as CheckIcon } from 'uiKit/Icons/check.svg';
import { ReactComponent as CrossIcon } from 'uiKit/Icons/cross.svg';
import { ReactComponent as QuestionIcon } from 'uiKit/Icons/question.svg';
import { t, tHTML } from '@ankr.com/common';
import {
  intlRoot,
  FEATURE_TABLE_ROW,
  ITableHelper,
  mapTableItem,
  TABLE_HELPER,
  HAS_TIP_MESSAGE,
} from './FeatureTableUtils';
import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';
import { useFeatureTableStyles } from './useFeatureTableStyles';

export const TableContent = () => {
  const classes = useFeatureTableStyles();

  return (
    <>
      {FEATURE_TABLE_ROW.map(rowIndex => (
        <TableRow key={`rowIndex-${rowIndex}`} className={classes.cellRow}>
          {TABLE_HELPER.map((item: ITableHelper, columnIndex: number) => {
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
              <TableCell
                key={`index-${columnIndex}`}
                className={classes.tableCell}
              >
                {text.includes(`${rowIndex}-${columnIndex}`) &&
                  tHTML(
                    `${intlRoot}.body-row.row-${columnIndex + 1}-${
                      rowIndex + 1
                    }`,
                  )}
                {HAS_TIP_MESSAGE &&
                  tipMessage.includes(`${rowIndex}-${columnIndex}`) && (
                    <TooltipWrapper
                      tipIcon={<QuestionIcon />}
                      className={classes.tip}
                      tooltipText={t(
                        `${intlRoot}.tip.${columnIndex + 1}-${rowIndex + 1}`,
                      )}
                    />
                  )}
                {supported.includes(`${rowIndex}-${columnIndex}`) && (
                  <CheckIcon className={classes.checkIcon} />
                )}
                {unsupported.includes(`${rowIndex}-${columnIndex}`) && (
                  <CrossIcon className={classes.crossIcon} />
                )}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </>
  );
};
