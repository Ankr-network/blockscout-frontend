import { ChangeEvent, useCallback } from 'react';

import { Token } from 'modules/common/types/token';
import { Select } from 'uiKit/Select';

import { useHistoryStyles } from './useHistoryStyles';
import { useTokenSelectOptions } from './useTokenSelectOptions';

interface IHistorySelectProps {
  isDisabled?: boolean;
  value?: Token;
  onChange?: (event: ChangeEvent<{ value: unknown }>) => void;
}

export const HistorySelect = ({
  isDisabled,
  value,
  onChange,
}: IHistorySelectProps): JSX.Element => {
  const classes = useHistoryStyles();
  const options = useTokenSelectOptions();

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
