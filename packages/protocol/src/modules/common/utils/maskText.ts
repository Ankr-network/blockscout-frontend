export interface MaskTextProps {
  leftSymbols?: number;
  mask?: string;
  rightSymbols?: number;
  text: string;
}

const DEFAULT_LEFT_SYMBOLS = 5;
const DEFAULT_RIGHT_SYMBOLS = 5;
const DEFAULT_MASK = '...';

export const maskText = ({
  leftSymbols = DEFAULT_LEFT_SYMBOLS,
  mask = DEFAULT_MASK,
  rightSymbols = DEFAULT_RIGHT_SYMBOLS,
  text,
}: MaskTextProps) => {
  if (text.length > leftSymbols + rightSymbols) {
    const left = text.slice(0, leftSymbols);
    const right = text.slice(-rightSymbols);

    return `${left}${mask}${right}`;
  }

  return text;
};
