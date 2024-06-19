import { Button } from '@mui/material';
import { Logout } from '@ankr.com/ui';

import { useSignoutButtonStyles } from './useSignoutButtonStyles';

interface SignoutButtonProps {
  onClick: () => void;
  title: string;
}

export const SignoutButton = ({ onClick, title }: SignoutButtonProps) => {
  const { classes } = useSignoutButtonStyles();

  return (
    <Button
      endIcon={<Logout />}
      className={classes.signoutButton}
      variant="text"
      size="large"
      onClick={onClick}
    >
      {title}
    </Button>
  );
};
