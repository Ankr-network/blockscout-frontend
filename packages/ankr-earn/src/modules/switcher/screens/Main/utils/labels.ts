import BigNumber from 'bignumber.js';

import { DECIMAL_PLACES } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTokenName } from 'modules/common/utils/getTokenName';
import {
  AvailableSwitcherToken,
  NATIVE_TOKEN_BY_SWITCH_OPTION,
} from 'modules/switcher/const';

interface IGetFromLabelArgs {
  token: AvailableSwitcherToken;
}

export const getFromLabel = ({ token }: IGetFromLabelArgs): string => {
  const nativeToken = NATIVE_TOKEN_BY_SWITCH_OPTION[token];

  switch (token) {
    case Token.aETHb:
    case Token.aETHc:
      return `1 ${Token.aETHb} = 1 ${nativeToken}`;

    case Token.aBNBb:
    case Token.aBNBc:
      return `1 ${Token.aBNBb} = 1 ${nativeToken}`;

    case Token.aMATICb:
    case Token.aMATICc:
      return `1 ${Token.aMATICb} = 1 ${nativeToken}`;

    case Token.aFTMb:
    case Token.aFTMc:
      return `1 ${Token.aFTMb} = 1 ${nativeToken}`;

    case Token.aAVAXb:
    case Token.aAVAXc:
      return `1 ${Token.aAVAXb} = 1 ${nativeToken}`;

    default:
      return '';
  }
};

interface IGetToLabelArgs {
  token: AvailableSwitcherToken;
  ratio: BigNumber;
}

export const getToLabel = ({ token, ratio }: IGetToLabelArgs): string => {
  const nativeToken = NATIVE_TOKEN_BY_SWITCH_OPTION[token];

  const nativeValue = !ratio.isZero()
    ? new BigNumber(1).dividedBy(ratio).decimalPlaces(DECIMAL_PLACES).toFixed()
    : '0';

  switch (token) {
    case Token.aETHb:
    case Token.aETHc:
      return `1 ${getTokenName(Token.aETHc)} = ${nativeValue} ${nativeToken}`;

    case Token.aBNBb:
    case Token.aBNBc:
      return `1 ${getTokenName(Token.aBNBc)} = ${nativeValue} ${nativeToken}`;

    case Token.aMATICb:
    case Token.aMATICc:
      return `1 ${getTokenName(Token.aMATICc)} = ${nativeValue} ${nativeToken}`;

    case Token.aFTMb:
    case Token.aFTMc:
      return `1 ${getTokenName(Token.aFTMc)} = ${nativeValue} ${nativeToken}`;

    case Token.aAVAXb:
    case Token.aAVAXc:
      return `1 ${getTokenName(Token.aAVAXc)} = ${nativeValue} ${nativeToken}`;

    default:
      return '';
  }
};
