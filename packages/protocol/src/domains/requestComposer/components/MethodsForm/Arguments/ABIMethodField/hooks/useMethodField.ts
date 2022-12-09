import { useContext, useEffect, useMemo, useState } from 'react';

import { ABI } from 'domains/requestComposer/types';
import { Field } from '../types';
import { LoggerContext } from '../../../../composers/const';
import { SelectField } from 'modules/form/components/SelectField';
import { getABI } from '../utils/getABI';
import { getABIFunctions } from '../utils/getABIFunctions';
import { getOption } from '../utils/getOption';

export interface MethodFieldParams {
  abi: string;
  className?: string;
  isABIFieldValid: boolean;
  params: Field;
}

export interface MethodField {
  abi?: ABI;
  field?: Field;
}

export const useMethodField = ({
  abi: input,
  className,
  isABIFieldValid,
  params,
}: MethodFieldParams): MethodField => {
  const { logError } = useContext(LoggerContext);
  const [abi, setABI] = useState<ABI>();

  const field: Field | undefined = useMemo(() => {
    const options = getABIFunctions(abi ?? []).map(getOption);
    const isValid = isABIFieldValid && options.length > 0;

    return isValid
      ? {
          component: SelectField as any,
          initialValue: options[0].value.toString(),
          options,
          rootClassName: className,
          ...params,
        }
      : undefined;
  }, [abi, className, isABIFieldValid, params]);

  useEffect(() => {
    if (input && isABIFieldValid) {
      getABI(input).then(setABI).catch(logError);
    }
  }, [input, isABIFieldValid, logError]);

  return { abi, field };
};
