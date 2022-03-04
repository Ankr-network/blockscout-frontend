import { ProgressBar } from 'uiKit/ProgressBar';

import { useProgressBar } from './useProgressBar';

interface IProgressProps {
  className?: string;
}

export const Progress = ({ className }: IProgressProps): JSX.Element => {
  const { percent } = useProgressBar(150000);
  return <ProgressBar className={className} value={percent} />;
};
