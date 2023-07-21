import { Fade, Menu, MenuProps } from '@mui/material';

import { selectUserGroups } from 'domains/userGroup/store';
import { useAppSelector } from 'store/useAppSelector';

import { useGroupMenuStyles } from './GroupMenuStyles';
import { GroupItem } from '../GroupItem';

export type GroupMenuProps = Pick<MenuProps, 'anchorEl' | 'open'> & {
  onClose: () => void;
};

export const GroupMenu = (props: GroupMenuProps) => {
  const groups = useAppSelector(selectUserGroups);
  const { onClose } = props;

  const { classes } = useGroupMenuStyles();

  return (
    <Menu
      PaperProps={{
        className: classes.paper,
      }}
      TransitionComponent={Fade}
      anchorOrigin={{
        vertical: 48,
        horizontal: 'right',
      }}
      classes={{
        list: classes.list,
      }}
      disableScrollLock
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    >
      {groups.map(group => (
        <GroupItem group={group} onSelect={onClose} key={group.groupAddress} />
      ))}
    </Menu>
  );
};
