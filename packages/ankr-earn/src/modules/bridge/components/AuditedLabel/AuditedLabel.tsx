import { ReactComponent as AuditedIcon } from 'assets/img/audited.svg';
import { BRIDGE_AUDIT_LINK } from 'modules/common/const';
import { t } from 'modules/i18n/utils/intl';
import { NavLink } from 'uiKit/NavLink';

import { useAuditedLabelStyles } from './useAuditedLabelStyles';

export const AuditedLabel = (): JSX.Element => {
  const classes = useAuditedLabelStyles();

  return (
    <NavLink
      className={classes.audited}
      endIcon={<AuditedIcon />}
      href={BRIDGE_AUDIT_LINK}
      variant="text"
    >
      {t('bridge.main.audited')}
    </NavLink>
  );
};
