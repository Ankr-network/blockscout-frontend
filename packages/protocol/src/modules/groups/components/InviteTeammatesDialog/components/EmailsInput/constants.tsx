import { Mail } from '@ankr.com/ui';
import { ChipProps } from '@mui/material';

export const chipProps: ChipProps = {
  size: 'small',
  color: 'secondary',
  icon: <Mail />,
};

export const forbiddenSymbols = ['\n'];
export const separators = [',', ';', ' '];
