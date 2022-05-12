import { useCallback, useState } from 'react';

export interface SwitcherParams<Data = string> {
  currentItem?: number;
  items: Data[];
  onSwitch?: (item: Data) => void;
}

const getCurrentIndex = <Data = string>(startIndex: number, items: Data[]) =>
  items[startIndex] ? startIndex : 0;

export const useSwitcher = <Data = string>({
  currentItem = 0,
  items,
  onSwitch = () => {},
}: SwitcherParams<Data>): [Data, () => void] => {
  const [currentIndex, setCurrentIndex] = useState(
    getCurrentIndex<Data>(currentItem, items),
  );

  const onClick = useCallback(() => {
    const index = getCurrentIndex(currentIndex + 1, items);

    setCurrentIndex(index);

    onSwitch(items[index]);
  }, [currentIndex, items, onSwitch]);

  return [items[currentIndex], onClick];
};
