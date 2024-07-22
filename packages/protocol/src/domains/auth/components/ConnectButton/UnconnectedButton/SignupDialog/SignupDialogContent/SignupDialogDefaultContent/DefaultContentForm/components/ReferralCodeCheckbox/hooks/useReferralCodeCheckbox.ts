import { useCallback, useEffect, useState } from 'react';

import { IReferralCodeCheckboxProps } from '../ReferralCodeCheckbox';

export interface IUseReferralCodeCheckboxProps {
  isChecked?: boolean;
  onChange?: (isChecked: boolean) => void;
}

export const useReferralCodeCheckbox = ({
  isChecked: isInitiallyChecked = false,
  onChange: onChangeExternal,
}: IUseReferralCodeCheckboxProps | void = {}): IReferralCodeCheckboxProps => {
  const [isChecked, setIsChecked] = useState(isInitiallyChecked);

  const onChange = useCallback(() => {
    setIsChecked(!isChecked);

    onChangeExternal?.(!isChecked);
  }, [isChecked, onChangeExternal]);

  useEffect(() => setIsChecked(isInitiallyChecked), [isInitiallyChecked]);

  return { isChecked, onChange };
};
