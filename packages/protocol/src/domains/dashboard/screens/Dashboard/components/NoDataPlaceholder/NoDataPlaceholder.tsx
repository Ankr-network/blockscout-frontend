import {
  DataPlaceholder,
  IDataPlaceholderProps,
} from 'modules/common/components/DataPlaceholder';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { noDataPlaceholderTranslation } from './translation';

export interface INoDataPlaceholderProps
  extends Omit<IDataPlaceholderProps, 'text'> {}

export const NoDataPlaceholder = (props: INoDataPlaceholderProps) => {
  const { keys, t } = useTranslation(noDataPlaceholderTranslation);

  return <DataPlaceholder {...props} text={t(keys.text)} />;
};
