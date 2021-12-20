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

const getPairedOption = (value: string) => {
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
      return;
  }
};

export const Default = () => {
  const onSubmit = (values: any) => {
    console.log({ values });
  };

  return (
    <Paper style={{ padding: 20 }}>
      <TokenForm
        onSubmit={onSubmit}
        options={tokenSelectMockup}
        defaultFromToken={tokenSelectMockup[0].value}
        defaultToToken={tokenSelectMockup[1].value}
        disabled={false}
        getPairedOption={getPairedOption}
      />
    </Paper>
  );
};
