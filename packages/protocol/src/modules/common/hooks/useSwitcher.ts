import { useCallback, useEffect, useState } from 'react';

export interface SwitcherParams<Data = string> {
  currentItem?: number;
  items: Data[];
  onSwitch?: (item: Data) => void;
  resetDeps?: any[];
}

const getCurrentIndex = <Data = string>(startIndex: number, items: Data[]) =>
  startIndex === items.length ? 0 : startIndex;

export const useSwitcher = <Data = string>({
  currentItem = 0,
  items,
  onSwitch = () => {},
  resetDeps = [],
}: SwitcherParams<Data>): [Data, () => void, (item: Data) => void] => {
  const [currentIndex, setCurrentIndex] = useState(
    getCurrentIndex<Data>(currentItem, items),
  );

  const onClick = useCallback(() => {
    const index = getCurrentIndex(currentIndex + 1, items);

    setCurrentIndex(index);

    onSwitch(items[index]);
  }, [currentIndex, items, onSwitch]);

  const setItem = useCallback(
    (item: Data) => {
      const index = items.findIndex(item_ => item_ === item);

      setCurrentIndex(index > -1 ? index : 0);
    },
    [items],
  );

  useEffect(() => {
    setCurrentIndex(getCurrentIndex<Data>(currentItem, items));
    // eslint-disable-next-line
  }, resetDeps);

  return [items[currentIndex], onClick, setItem];
};
