import { IGlobalMenuLinkProps, IGlobalMenuProject } from '../types';

export interface IGlobalMenuProps {
  isMobile?: boolean;
  Link?: React.FC<IGlobalMenuLinkProps>;
  project: IGlobalMenuProject;
  locale: string;
  className?: string;
  fallBack?: JSX.Element;
}
