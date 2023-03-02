import { Console } from './components/Console';
import { Header } from './components/Header';
import { Log } from '../composers/types';
import { BlackBox } from '../BlackBox';

export interface LoggerProps {
  className?: string;
  clear: () => void;
  logs: Log[];
}

export const Logger = ({ className, clear, logs }: LoggerProps) => (
  <BlackBox className={className} header={<Header onClear={clear} />}>
    <Console logs={logs} />
  </BlackBox>
);
