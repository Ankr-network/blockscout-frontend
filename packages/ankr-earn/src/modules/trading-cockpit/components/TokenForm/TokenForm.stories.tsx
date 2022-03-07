import { Paper } from '@material-ui/core';

import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AMATICBIcon } from 'uiKit/Icons/AMATICBIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';
import { MaticIcon } from 'uiKit/Icons/MaticIcon';

import { ITokenSelectOption } from '../TokenSelect';

import { TokenForm } from './TokenForm';

export default {
  title: 'modules/TradingCockpit/components/TokenForm',
};

const tokenSelectMockup: ITokenSelectOption[] = [
  {
    text: 'ETH',
    iconSlot: <EthIcon />,
    value: 'ETH',
  },
  {
    text: 'aETHb',
    iconSlot: <AETHBIcon />,
    value: 'aETHb',
  },
  {
    text: 'MATIC',
    iconSlot: <MaticIcon />,
    value: 'MATIC',
  },
  {
    text: 'aMATICb',
    iconSlot: <AMATICBIcon />,
    value: 'aMATICb',
  },
];

const getPairedOption = (value: string): string => {
  switch (value) {
    case 'ETH':
      return 'aETHb';
    case 'aETHb':
      return 'ETH';
    case 'MATIC':
      return 'aMATICb';
    case 'aMATICb':
      return 'MATIC';
    default:
      return '';
  }
};

export const Default = (): JSX.Element => {
  const onSubmit = (values: unknown) => {
    // eslint-disable-next-line no-console
    console.log({ values });
  };

  return (
    <Paper style={{ padding: 20 }}>
      <TokenForm
        defaultFromToken={tokenSelectMockup[0].value}
        defaultToToken={tokenSelectMockup[1].value}
        disabled={false}
        getPairedOption={getPairedOption}
        options={tokenSelectMockup}
        onSubmit={onSubmit}
      />
    </Paper>
  );
};
