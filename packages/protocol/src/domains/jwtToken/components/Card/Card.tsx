import { useCallback } from 'react';
import { t } from '@ankr.com/common';
import { Button, Typography } from '@mui/material';

import { Warning } from '@ankr.com/ui';
import { useCardStyles } from './useCardStyles';
import {
  jwtTokenIntlRoot,
  PRIMARY_TOKEN_INDEX,
  renderToken,
} from 'domains/jwtToken/utils/utils';

interface ICardProps {
  isSelected: boolean;
  userEndpointToken: string;
  tokenIndex: number;
  setViewTokenIndex: (index: number) => void;
  setSelectedIndex: (index: number) => void;
  onOpenViewProject: () => void;
}

export const Card = ({
  isSelected,
  setSelectedIndex,
  userEndpointToken,
  tokenIndex,
  setViewTokenIndex,
  onOpenViewProject,
}: ICardProps) => {
  const { classes } = useCardStyles(isSelected);

  const handleSelect = useCallback(() => {
    setSelectedIndex(tokenIndex);
  }, [tokenIndex, setSelectedIndex]);

  const handleViewProject = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setViewTokenIndex(tokenIndex);
      onOpenViewProject();
    },
    [tokenIndex, setViewTokenIndex, onOpenViewProject],
  );

  return (
    <div
      className={classes.root}
      role="button"
      tabIndex={0}
      onClick={handleSelect}
    >
      <Typography className={classes.name}>
        {tokenIndex === PRIMARY_TOKEN_INDEX
          ? t(`${jwtTokenIntlRoot}.default-project-name`)
          : t(`${jwtTokenIntlRoot}.additional`, { index: tokenIndex })}
      </Typography>
      <div className={classes.row}>
        <Typography className={classes.token}>
          {renderToken(userEndpointToken)}
        </Typography>
        <Button
          className={classes.view}
          variant="text"
          color="secondary"
          onClick={handleViewProject}
        >
          <Warning />
        </Button>
      </div>
    </div>
  );
};
