import { Paper } from '@material-ui/core';
import { ChangeEvent, useMemo, useState } from 'react';

import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';

import { ITokenSelectOption, TokenSelect } from './TokenSelect';

export default {
  title: 'modules/TradingCockpit/components/TokenSelect',
};

export const Default = (): JSX.Element => {
  const [value, setValue] = useState('1');

  const options: ITokenSelectOption[] = useMemo(
    () => [
      {
        value: '1',
        iconSlot: <AETHBIcon />,
        text: 'aETHb',
        disabled: false,
      },
      {
        value: '2',
        iconSlot: <EthIcon />,
        text: 'ETH',
        disabled: false,
      },
    ],
    [],
  );

  const onChange = (event: ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string);
  };

  return (
    <Paper style={{ padding: 20 }}>
      <TokenSelect
        options={options}
        value={value}
        variant="filled"
        onChange={onChange}
      />
    </Paper>
  );
};
