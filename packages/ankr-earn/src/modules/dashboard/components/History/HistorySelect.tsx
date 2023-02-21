import { ChangeEvent, useCallback } from 'react';

import { Token } from 'modules/common/types/token';
import { ISelectOption, Select } from 'uiKit/Select';

import { useHistoryStyles } from './useHistoryStyles';

interface IHistorySelectProps {
  isDisabled?: boolean;
  options: ISelectOption[];
  value?: Token;
  onChange?: (event: ChangeEvent<{ value: unknown }>) => void;
}

export const HistorySelect = ({
  isDisabled,
  options,
  value,
  onChange,
}: IHistorySelectProps): JSX.Element => {
  const classes = useHistoryStyles();

  const renderValue = useCallback(
    option => {
      const label = options.find(o => o.value === option)?.label || ' ';
      return <div className={classes.tokenValue}>{label}</div>;
    },
    [classes.tokenValue, options],
  );

  return (
    <Select
      withoutDivider
      className={classes.select}
      disabled={isDisabled}
      options={options}
      renderValue={renderValue}
      rootClassName={classes.selectRoot}
      value={value}
      variant="filled"
      onChange={onChange}
    />
  );
};
