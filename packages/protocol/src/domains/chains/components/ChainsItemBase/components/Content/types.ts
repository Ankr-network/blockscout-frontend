import { ChainsItemBaseProps } from '../../ChainsItemBaseTypes';

type PropsToPick =
  | 'chainsItemButton'
  | 'chainsItemLink'
  | 'description'
  | 'hasPremiumDialog'
  | 'isHighlighted'
  | 'isLoading'
  | 'logoSrc'
  | 'name'
  | 'period'
  | 'timeframe'
  | 'totalRequests';

export interface ContentProps extends Pick<ChainsItemBaseProps, PropsToPick> {
  isArchive: ChainsItemBaseProps['chain']['isArchive'];
  isSui: boolean;
}
