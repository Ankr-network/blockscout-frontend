import { Box, Button, Paper } from '@mui/material';
import { t } from '@ankr.com/common';
import { IApiChain } from 'domains/chains/api/queryChains';
import { CodeHighlighter } from 'modules/common/components/CodeHighlighter';
import { ChainDocsLink } from '../ChainDocsLink';
import { useStyles } from './CodeSampleWrapperStyles';
import { CodeSampleTabs } from './CodeSampleTabs';
import { ReactNode, useState } from 'react';
import { useThemes } from 'uiKit/Theme/hook/useThemes';
import { CodeType, mapLanguageByCodeType, getSnippetByCodeType } from './const';

interface CodeSampleWrapperProps {
  chain: IApiChain;
  header: ReactNode;
  url?: string;
}

export const CodeSampleWrapper = ({
  chain,
  header,
  url,
}: CodeSampleWrapperProps) => {
  const { isLightTheme } = useThemes();
  const { classes, cx } = useStyles(isLightTheme);
  const [codeType, setCodeType] = useState(CodeType.ANKRJS);

  return (
    <Paper className={classes.root}>
      <Box className={classes.header}>
        {header}
        <Box className={classes.buttons}>
          <ChainDocsLink
            className={cx(classes.btn, classes.btnDocs)}
            size="large"
            variant="contained"
            chain={chain}
          />
          <Button
            className={classes.btn}
            size="large"
            variant="outlined"
            color="info"
            href="https://www.npmjs.com/package/@ankr.com/ankr.js"
            target="_blank"
          >
            {t('advanced-api.js-sdk')}
          </Button>
          <Button
            className={classes.btn}
            size="large"
            variant="outlined"
            color="info"
            href="https://pypi.org/project/ankr-sdk/"
            target="_blank"
          >
            {t('advanced-api.python-sdk')}
          </Button>
        </Box>
      </Box>

      <Box className={classes.codeSampleWrapper}>
        <CodeSampleTabs
          classNameTab={classes.tab}
          classNameTabsWrapper={classes.tabsWrapper}
          setCodeType={setCodeType}
        />
        <CodeHighlighter
          className={classes.codeSample}
          code={getSnippetByCodeType(codeType, url)}
          language={mapLanguageByCodeType[codeType]}
        />
      </Box>
    </Paper>
  );
};
