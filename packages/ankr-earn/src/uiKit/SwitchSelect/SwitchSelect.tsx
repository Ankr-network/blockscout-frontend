import { Chip, IconButton, Typography } from '@material-ui/core';
import {
  useCallback,
  useMemo,
  ReactElement,
  ReactText,
  ReactNode,
} from 'react';

import { t } from 'modules/i18n/utils/intl';
import { ArrowIcon } from 'uiKit/Icons/ArrowIcon';

import { Select } from '../Select';

import { useSwitchSelectStyles } from './useSwitchSelectStyles';

export type TOption = {
  label: ReactNode;
  value: ReactText;
  icon: ReactElement;
  disabled?: boolean;
};

export interface ISwitchSelectProps {
  from: TOption[];
  to: TOption[];
  values: { from: string; to: string };
  isPairSelect?: boolean;
  onChangeFrom: (value: string) => void;
  onChangeTo: (value: string) => void;
  onChangeSwitch: () => void;
}

export const SwitchSelect = ({
  from,
  to,
  isPairSelect = false,
  values,
  onChangeFrom,
  onChangeTo,
  onChangeSwitch,
}: ISwitchSelectProps): JSX.Element => {
  const classes = useSwitchSelectStyles();

  const labels = useMemo(
    () =>
      from
        .concat(to)
        .reduce<Record<string, ReactNode>>(
          (acc, x) => ({ ...acc, [x.value]: x.label }),
          {},
        ),
    [from, to],
  );

  const icons = useMemo(
    () =>
      from
        .concat(to)
        .reduce<Record<string, ReactElement>>(
          (acc, x) => ({ ...acc, [x.value]: x.icon }),
          {},
        ),
    [from, to],
  );

  const renderValue = useCallback(
    (direction: string) => (value: unknown) =>
      (
        <Chip
          classes={{ label: classes.chipLabel }}
          className={classes.switchChip}
          clickable={false}
          data-testid={`${value}-chip`}
          icon={icons[value as string]}
          label={
            <div className={classes.chipLabelContainer}>
              <span className={classes.direction}>{direction}</span>

              <div>{labels[value as string]}</div>
            </div>
          }
        />
      ),
    [classes, icons, labels],
  );

  const prepareOptions = useCallback(
    (options: TOption[]) =>
      options.map(({ label, value, icon, disabled }) => ({
        label: (
          <div key={value} className={classes.selectItem}>
            {icon}

            <Typography className={classes.symbol}>{label}</Typography>
          </div>
        ),
        value,
        disabled,
      })),
    [classes.symbol, classes.selectItem],
  );

  const fromOptions = useMemo(
    () => prepareOptions(from),
    [from, prepareOptions],
  );

  const toOptions = useMemo(() => prepareOptions(to), [to, prepareOptions]);

  const handleChangeFrom = useCallback(
    event => {
      const selected = event.target.value;

      if (isPairSelect) {
        const index = from.findIndex(({ value }) => value === selected);
        onChangeTo(to[index].value.toString());
      }

      onChangeFrom(selected);
    },
    [to, from, isPairSelect, onChangeFrom, onChangeTo],
  );

  const handleChangeTo = useCallback(
    event => {
      const selected = event.target.value;

      if (isPairSelect) {
        const index = to.findIndex(({ value }) => value === selected);
        onChangeFrom(from[index].value.toString());
      }

      onChangeTo(selected);
    },
    [to, from, isPairSelect, onChangeFrom, onChangeTo],
  );

  return (
    <div className={classes.root}>
      <Select
        autoWidth={false}
        classes={{ select: classes.select }}
        className={classes.select}
        data-testid="switch-from"
        disabled={fromOptions.length === 1}
        options={fromOptions}
        renderValue={renderValue(t('common.labels.from'))}
        rootClassName={classes.selectContainer}
        value={values.from || fromOptions[0]?.value}
        onChange={handleChangeFrom}
      />

      <IconButton
        className={classes.switchIcon}
        data-testid="switch-icon"
        onClick={onChangeSwitch}
      >
        <ArrowIcon />
      </IconButton>

      <Select
        autoWidth={false}
        classes={{ select: classes.select }}
        className={classes.select}
        data-testid="switch-to"
        disabled={toOptions.length === 1}
        options={toOptions}
        renderValue={renderValue(t('common.labels.to'))}
        rootClassName={classes.selectContainer}
        value={values.to || toOptions[0]?.value}
        onChange={handleChangeTo}
      />
    </div>
  );
};
