import { ReactComponent as AuditedIcon } from 'assets/img/audited.svg';
import { t } from 'modules/i18n/utils/intl';
import { NavLink } from 'uiKit/NavLink';

import { useAuditedLabelStyles } from './useAuditedLabelStyles';

interface IAuditedLabelProps {
  auditLink: string;
}

export const AuditedLabel = ({
  auditLink,
}: IAuditedLabelProps): JSX.Element => {
  const classes = useAuditedLabelStyles();

  return (
    <NavLink
      className={classes.audited}
      href={auditLink}
      startIcon={<AuditedIcon />}
      variant="text"
    >
      {t('bridge.main.audited')}
    </NavLink>
  );
};
