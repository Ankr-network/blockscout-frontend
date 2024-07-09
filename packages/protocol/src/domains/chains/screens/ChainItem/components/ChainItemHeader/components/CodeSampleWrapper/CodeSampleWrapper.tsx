import { Box, Paper } from '@mui/material';
import { ReactNode, useState } from 'react';

import { CodeHighlighter } from 'modules/common/components/CodeHighlighter';
import { useThemes } from 'uiKit/Theme/hook/useThemes';
import { CopyCodeButton } from 'modules/common/components/GetStartedSection/components/CopyCodeButton';

import { useStyles } from './CodeSampleWrapperStyles';
import { CodeSampleTabs } from './CodeSampleTabs';
import { CodeType, mapLanguageByCodeType, getSnippetByCodeType } from './const';

interface CodeSampleWrapperProps {
  header: ReactNode;
  url?: string;
  codeSampleWrapperClassName?: string;
}

export const CodeSampleWrapper = ({
  codeSampleWrapperClassName,
  header,
  url,
}: CodeSampleWrapperProps) => {
  const { isLightTheme } = useThemes();
  const { classes, cx } = useStyles(isLightTheme);
  const [codeType, setCodeType] = useState(CodeType.ANKRJS);

  const code = getSnippetByCodeType(codeType, url);

  return (
    <Paper className={cx(classes.root, codeSampleWrapperClassName)}>
      <Box className={classes.header}>{header}</Box>

      <Box className={classes.codeSampleWrapper}>
        <div className={classes.sandboxHeader}>
          <CodeSampleTabs
            classNameTab={classes.tab}
            classNameTabsWrapper={classes.tabsWrapper}
            setCodeType={setCodeType}
          />
          <CopyCodeButton className={classes.copyButton} code={code} />
        </div>
        <CodeHighlighter
          className={classes.codeSample}
          code={code}
          language={mapLanguageByCodeType[codeType]}
        />
      </Box>
    </Paper>
  );
};
