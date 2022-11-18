import { t } from '@ankr.com/common';
import { Container, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { format } from 'date-fns';
import { ChangeEvent, ReactText, useCallback, useMemo, useState } from 'react';
import { uid } from 'react-uid';

import { DECIMAL_PLACES } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getShortTxHash } from 'modules/common/utils/getShortStr';
import { EHistorySynthTokens } from 'modules/stake/types';
import { Button } from 'uiKit/Button';
import { Dialog } from 'uiKit/Dialog';
import { NavLink } from 'uiKit/NavLink';
import { Select } from 'uiKit/Select';
import { Spinner } from 'uiKit/Spinner';
import { Tooltip } from 'uiKit/Tooltip';

import { useHistory } from './hooks/useHistory';
import { IHistoryDialogRow } from './types';
import { useHistoryDialogStyles as useStyles } from './useHistoryDialogStyles';

enum EHistoryTypes {
  Staked = 'staked',
  Unstaked = 'unstaked',
}

export interface IHistoryDialogData {
  staked: IHistoryDialogRow[];
  stakedToken: Token;
  unstaked: IHistoryDialogRow[];
  unstakedToken: Token;
}

export interface IHistoryDialogProps {
  token: Token;
  network: number;
  open: boolean;
  onClose: () => void;
}

const TOKEN_OPTIONS = Object.keys(EHistorySynthTokens).map(tokenItem => ({
  label: tokenItem,
  value: tokenItem,
}));

export const NewHistoryDialog = ({
  token,
  network,
  open,
  onClose,
}: IHistoryDialogProps): JSX.Element => {
  const classes = useStyles();
  const [selectedToken, setSelectedToken] = useState(token);

  const { stakeEvents, unstakeEvents, loading, weeksAmount, handleShowMore } =
    useHistory({ token: selectedToken, open, network });

  const history: IHistoryDialogData = useMemo(
    () => ({
      staked: stakeEvents,
      stakedToken: selectedToken,
      unstaked: unstakeEvents,
      unstakedToken: selectedToken,
    }),
    [selectedToken, stakeEvents, unstakeEvents],
  );

  const [showType, setShowType] = useState<EHistoryTypes>(EHistoryTypes.Staked);

  const handleSetStakedType = () => setShowType(EHistoryTypes.Staked);
  const handleSetUnstakedType = () => setShowType(EHistoryTypes.Unstaked);

  const tableRows = useMemo(
    () =>
      history[showType]?.map(({ date, link, hash, amount }, index) => (
        <tr key={uid(index)} className={classes.tr}>
          <td className={classes.td}>
            {date
              ? t('history-dialog.date-cell', {
                  month: format(date, 'LLLL'),
                  day: format(date, 'dd'),
                  year: format(date, 'yyyy'),
                })
              : t('history-dialog.error-cell')}
          </td>

          <td className={classes.td}>
            {link && hash ? (
              <NavLink className={classes.txLink} href={link}>
                {t('history-dialog.hash-cell', { hash: getShortTxHash(hash) })}
              </NavLink>
            ) : (
              t('history-dialog.error-cell')
            )}
          </td>

          <td className={classNames(classes.td, classes.amount)}>
            {amount ? (
              <Tooltip
                arrow
                title={`${amount.toFormat()} ${history[`${showType}Token`]}`}
              >
                <div>
                  {t('history-dialog.amount-cell', {
                    value: amount.decimalPlaces(DECIMAL_PLACES).toFormat(),
                    token: history[`${showType}Token`],
                  })}
                </div>
              </Tooltip>
            ) : (
              t('history-dialog.error')
            )}
          </td>
        </tr>
      )),
    [classes, history, showType],
  );

  const txHistory = useMemo(() => {
    const isFullHistory = Array.isArray(tableRows) && !!tableRows.length;

    const emptyHistory = (
      <div className={classes.empty}>
        {loading ? <Spinner /> : t('history-dialog.empty')}
      </div>
    );

    const fullHistory = (
      <table className={classes.table}>
        <thead className={classes.thead}>
          <tr className={classes.theadTr}>
            <th className={classes.th}>{t('history-dialog.date')}</th>

            <th className={classes.th}>{t('history-dialog.hash')}</th>

            <th className={classes.th}>{t('history-dialog.stake')}</th>
          </tr>
        </thead>

        <tbody>{tableRows}</tbody>
      </table>
    );

    return isFullHistory ? fullHistory : emptyHistory;
  }, [classes, loading, tableRows]);

  const renderValue = useCallback(
    option => {
      const currentOption = TOKEN_OPTIONS.find(o => o.value === option);

      return (
        <div className={classes.tokenValue}>{currentOption?.label ?? ' '}</div>
      );
    },
    [classes],
  );

  const handleClose = (): void => {
    setSelectedToken(token);
    onClose();
  };

  const onSelectedTokenChange = useCallback(
    (event: ChangeEvent<{ value: ReactText | unknown }>) => {
      setSelectedToken(event.target.value as Token);
    },
    [setSelectedToken],
  );

  const getFooterText = useCallback(() => {
    if (loading) {
      return t('history-dialog.loading-date-range');
    }

    if (weeksAmount > 2) {
      return t('history-dialog.date-range', { value: weeksAmount });
    }

    return t('history-dialog.default-date-range');
  }, [loading, weeksAmount]);

  const isInitLoading =
    loading && (!Array.isArray(tableRows) || !tableRows.length);

  return (
    <Dialog className={classes.root} open={open} onClose={handleClose}>
      <Container className={classes.container} data-testid="history-dialog">
        <Typography className={classes.header} variant="h3">
          {t('history-dialog.header')}
        </Typography>

        <div className={classes.transactionTypeWrapper}>
          <div className={classes.transactionType}>
            <Button
              className={classNames(
                classes.typeButton,
                showType === EHistoryTypes.Staked && classes.typeButtonActive,
              )}
              onClick={handleSetStakedType}
            >
              {t('history-dialog.staking')}
            </Button>

            <Button
              className={classNames(
                classes.typeButton,
                showType === EHistoryTypes.Unstaked && classes.typeButtonActive,
              )}
              onClick={handleSetUnstakedType}
            >
              {t('history-dialog.unstaking')}
            </Button>
          </div>
        </div>

        <Select
          withoutDivider
          className={classes.select}
          disabled={loading}
          options={TOKEN_OPTIONS}
          renderValue={renderValue}
          rootClassName={classes.selectRoot}
          value={selectedToken}
          variant="filled"
          onChange={onSelectedTokenChange}
        />

        <div className={classes.tableWrapper}>
          {txHistory}

          {!isInitLoading && (
            <div className={classes.footer}>
              <Button
                className={classes.showMoreButton}
                isLoading={loading}
                variant="outlined"
                onClick={handleShowMore}
              >
                {loading
                  ? t('history-dialog.loading-history')
                  : t('history-dialog.show-more')}
              </Button>

              <Typography className={classes.footerText} color="textSecondary">
                {getFooterText()}
              </Typography>
            </div>
          )}
        </div>
      </Container>
    </Dialog>
  );
};
