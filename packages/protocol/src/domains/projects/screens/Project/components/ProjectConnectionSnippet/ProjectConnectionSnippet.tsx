import { Box, Typography } from '@mui/material';
import { NoItemsIcon } from '@ankr.com/ui';

import {
  ConnectionSnippet,
  ConnectionSnippetProps,
} from 'modules/common/components/GetStartedSection/components/ConnectionSnippet';
import { useChainProtocolContext } from 'domains/chains/screens/ChainPage/hooks/useChainProtocolContext';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { useProjectConnectionSnippetStyles } from './useProjectConnectionSnippetStyles';
import { projectSnippetTranslation } from './translation';

interface ProjectConnectionSnippetProps extends ConnectionSnippetProps {
  isHidden?: boolean;
  className?: string;
  isTitleHidden?: boolean;
}

export const ProjectConnectionSnippet = ({
  className,
  httpCode,
  isHidden,
  isTitleHidden,
  setTechnology,
  technology,
  wssCode,
}: ProjectConnectionSnippetProps) => {
  const { isChainProtocolSwitchEnabled } = useChainProtocolContext();

  const hasCode = wssCode || httpCode;
  const isConnectionSnippetHidden =
    isChainProtocolSwitchEnabled || isHidden || !hasCode;

  const { keys, t } = useTranslation(projectSnippetTranslation);
  const { classes } = useProjectConnectionSnippetStyles();

  const placeholder = isConnectionSnippetHidden ? (
    <Box className={classes.snippetPlaceholderWrapper}>
      <NoItemsIcon className={classes.noItemsIcon} />
      <Typography variant="body3" color="textSecondary" mt={1}>
        {t(keys.placeholder)}
      </Typography>
    </Box>
  ) : undefined;

  return (
    <ConnectionSnippet
      className={className}
      hasFullWidthSnippets
      setTechnology={setTechnology}
      httpCode={httpCode}
      wssCode={wssCode}
      technology={technology}
      isTitleHidden={isTitleHidden}
      placeholder={placeholder}
    />
  );
};
