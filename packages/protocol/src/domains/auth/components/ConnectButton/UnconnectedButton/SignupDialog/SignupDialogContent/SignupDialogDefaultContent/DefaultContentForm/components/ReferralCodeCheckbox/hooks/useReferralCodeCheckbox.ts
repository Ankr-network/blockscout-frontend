import { useCallback, useEffect, useMemo, useState } from 'react';

import { IReferralCodeCheckboxProps } from '../ReferralCodeCheckbox';

export interface IUseReferralCodeCheckboxProps {
  isChecked?: boolean;
  onChange?: (isChecked: boolean) => void;
  isDisabled?: boolean;
}

export const useReferralCodeCheckbox = ({
  isChecked: isInitiallyChecked = false,
  isDisabled,
  onChange: onChangeExternal,
}: IUseReferralCodeCheckboxProps = {}) => {
  const [isChecked, setIsChecked] = useState(isInitiallyChecked);

  const onChange = useCallback(() => {
    setIsChecked(!isChecked);

    onChangeExternal?.(!isChecked);
  }, [isChecked, onChangeExternal]);

  useEffect(() => setIsChecked(isInitiallyChecked), [isInitiallyChecked]);

  const referralCodeCheckboxProps = useMemo(
    (): IReferralCodeCheckboxProps => ({ isChecked, isDisabled, onChange }),
    [isChecked, isDisabled, onChange],
  );

  return { referralCodeCheckboxProps };
};
