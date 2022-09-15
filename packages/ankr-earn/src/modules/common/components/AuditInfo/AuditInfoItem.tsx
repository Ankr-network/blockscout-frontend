import { cloneElement } from 'react';

import { NavLink } from 'uiKit/NavLink';

import { useAuditInfoStyles } from './useAuditInfoStyles';
import { TAuditVariant, useAuditVariants } from './useAuditVariants';

interface IAuditInfoItemProps {
  variant: TAuditVariant;
  link: string;
}

export const AuditInfoItem = ({
  variant,
  link,
}: IAuditInfoItemProps): JSX.Element => {
  const classes = useAuditInfoStyles();
  const variants = useAuditVariants();
  const { text, icon } = variants[variant];

  return (
    <NavLink
      className={classes.item}
      color="secondary"
      href={link}
      variant="inline-text"
    >
      {text}

      {cloneElement(icon, { className: classes.itemIcon })}
    </NavLink>
  );
};
