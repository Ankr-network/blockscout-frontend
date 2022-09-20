import { useContext, useEffect, useMemo, useState } from 'react';

import { ABI } from 'domains/requestComposer/types';
import { Field } from '../types';
import { LoggerContext } from '../../../../../const';
import { SelectField } from 'modules/form/components/SelectField';
import { getABI } from '../utils/getABI';
import { getABIFunctions } from '../utils/getABIFunctions';
import { getOption } from '../utils/getOption';

export interface MethodFieldParams {
  abi: string;
  className?: string;
  isABIFieldValid: boolean;
  name: string;
}

export interface MethodField {
  abi?: ABI;
  field?: Field;
}

const helperText = 'Function name (READ only)';

export const useMethodField = ({
  abi: input,
  className,
  isABIFieldValid,
  name,
}: MethodFieldParams): MethodField => {
  const { logError } = useContext(LoggerContext);
  const [abi, setABI] = useState<ABI>();

  const field: Field | undefined = useMemo(() => {
    const options = getABIFunctions(abi ?? []).map(getOption);
    const isValid = isABIFieldValid && options.length > 0;

    return isValid
      ? {
          component: SelectField as any,
          helperText,
          initialValue: options[0].value.toString(),
          name,
          options,
          rootClassName: className,
        }
      : undefined;
  }, [abi, className, isABIFieldValid, name]);

  useEffect(() => {
    if (input && isABIFieldValid) {
      getABI(input).then(setABI).catch(logError);
    }
  }, [input, isABIFieldValid, logError]);

  return { abi, field };
};
