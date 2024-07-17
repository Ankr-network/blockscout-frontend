import { Box, Paper } from '@mui/material';
import { useState } from 'react';

import { CodeHighlighter } from 'modules/common/components/CodeHighlighter';
import { useThemes } from 'uiKit/Theme/hook/useThemes';
import { CopyCodeButton } from 'modules/common/components/GetStartedSection/components/CopyCodeButton';

import { useMultichainCodeSampleWrapperStyles } from './useMultichainCodeSampleWrapperStyles';
import { CodeSampleTabs } from './CodeSampleTabs';
import {
  CodeType,
  mapLanguageByCodeType,
  getAAPISnippetByCodeType,
} from './const';

interface CodeSampleWrapperProps {
  url?: string;
  codeSampleWrapperClassName?: string;
}

export const MultichainCodeSampleWrapper = ({
  codeSampleWrapperClassName,
  url,
}: CodeSampleWrapperProps) => {
  const { isLightTheme } = useThemes();
  const { classes, cx } = useMultichainCodeSampleWrapperStyles(isLightTheme);
  const [codeType, setCodeType] = useState(CodeType.ANKRJS);

  const code = getAAPISnippetByCodeType(codeType, url);

  return (
    <Paper className={cx(classes.root, codeSampleWrapperClassName)}>
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
