import { useCallback, useState } from 'react';

export const useDataTransferSwitcher = () => {
  const [isDataTransferEnabled, setIsDataTransferEnabled] = useState(false);

  const onDataTransferSwitchChange = useCallback(() => {
    setIsDataTransferEnabled(!isDataTransferEnabled);
  }, [isDataTransferEnabled]);

  return {
    onDataTransferSwitchChange,
    isDataTransferEnabled,
  };
};
