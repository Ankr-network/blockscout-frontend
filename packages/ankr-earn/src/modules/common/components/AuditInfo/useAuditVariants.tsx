import { t } from '@ankr.com/common';

import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';

import { ReactComponent as BeosinLogoIcon } from './assets/beosin-logo.svg';
import { ReactComponent as PeckshieldIcon } from './assets/peckshield-logo.svg';

export type TAuditVariant = 'beosin' | 'peckshield';

interface IUseAuditVariant {
  icon: JSX.Element;
  text: string;
}

export const useAuditVariants = (): Record<TAuditVariant, IUseAuditVariant> =>
  useLocaleMemo(
    () => ({
      peckshield: {
        icon: <PeckshieldIcon />,
        text: t('audit-info.peckshield'),
      },
      beosin: {
        icon: <BeosinLogoIcon />,
        text: t('audit-info.beosin'),
      },
    }),
    [],
  );
