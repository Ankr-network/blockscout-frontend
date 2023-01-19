import { SvgIcon } from '@mui/material';
import { SVGProps } from 'react';

export interface IFeature {
  Icon: React.FunctionComponent<SVGProps<SVGSVGElement>> | typeof SvgIcon;
  key: string;
}
