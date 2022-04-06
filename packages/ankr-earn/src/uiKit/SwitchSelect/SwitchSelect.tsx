import { Chip, IconButton, Typography } from '@material-ui/core';
import { useCallback, ReactElement, useMemo } from 'react';

import { ArrowIcon } from 'uiKit/Icons/ArrowIcon';

import { Select } from '../Select';

import { useSwitchSelectStyles } from './useSwitchSelectStyles';

export type TOption = { value: string; icon: ReactElement };

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
    (value: unknown) => (
      <Chip
        className={classes.switchChip}
        clickable={false}
        data-testid={`${value}-chip`}
        icon={icons[value as string]}
        label={value as string}
      />
    ),
    [classes.switchChip, icons],
  );

  const prepareOptions = useCallback(
    (options: TOption[]) =>
      options.map(({ value, icon }) => ({
        label: (
          <div key={value} className={classes.selectItem}>
            {icon}

            <Typography className={classes.symbol}>{value}</Typography>
          </div>
        ),
        value,
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
        onChangeTo(to[index].value);
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
        onChangeFrom(from[index].value);
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
        renderValue={renderValue}
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
        renderValue={renderValue}
        rootClassName={classes.selectContainer}
        value={values.to || toOptions[0]?.value}
        onChange={handleChangeTo}
      />
    </div>
  );
};
