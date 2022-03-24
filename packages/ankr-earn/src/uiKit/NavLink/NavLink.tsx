import { ForwardedRef, forwardRef } from 'react';

import { NavLink as NavLinkBase } from 'ui';

import { QueryLoading } from 'uiKit/QueryLoading';

export const NavLink = forwardRef(
  (
    props: React.ComponentProps<typeof NavLinkBase>,
    ref: ForwardedRef<HTMLButtonElement | HTMLAnchorElement>,
  ): JSX.Element => {
    return (
      <NavLinkBase loader={<QueryLoading size={16} />} {...props} ref={ref} />
    );
  },
);
