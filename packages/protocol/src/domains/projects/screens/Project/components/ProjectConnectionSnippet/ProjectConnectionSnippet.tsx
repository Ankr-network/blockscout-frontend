import {
  ConnectionSnippet,
  ConnectionSnippetProps,
} from 'modules/common/components/GetStartedSection/components/ConnectionSnippet';
import { useChainProtocolContext } from 'domains/chains/screens/ChainItem/hooks/useChainProtocolContext';

interface ProjectConnectionSnippetProps extends ConnectionSnippetProps {
  isHidden?: boolean;
}

export const ProjectConnectionSnippet = ({
  technology,
  setTechnology,
  httpCode,
  wssCode,
  isHidden,
}: ProjectConnectionSnippetProps) => {
  const { isChainProtocolSwitchEnabled } = useChainProtocolContext();

  const hasCode = wssCode || httpCode;
  const isConnectionSnippetHidden =
    isChainProtocolSwitchEnabled || isHidden || !hasCode;

  if (isConnectionSnippetHidden) {
    return null;
  }

  return (
    <ConnectionSnippet
      hasFullWidthSnippets
      setTechnology={setTechnology}
      httpCode={httpCode}
      wssCode={wssCode}
      technology={technology}
    />
  );
};
