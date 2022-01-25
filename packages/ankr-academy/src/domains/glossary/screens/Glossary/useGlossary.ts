import React, { useEffect, useRef, useState } from 'react';
import { NON_LETTER_MENU_BUTTON } from '../../const';
import { isLetter } from '../../../../utils/isLetter';
import { findGlossaryItems, sortData } from './GlossaryUtils';
import { glossaryMock } from '../../glossaryMock';
import { GlossaryMock } from '../../types';

export const useGlossary = () => {
  /* input start */
  // input value is used only for search here. not for input state management
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const currentTarget = event.target as HTMLInputElement;
    setInputValue(currentTarget.value);
  };
  /* input end */

  /* search start */
  const [sortedGlossaryData] = useState(sortData(glossaryMock));
  const [glossaryItems, setGlossaryItems] = useState<GlossaryMock>(
    sortData(glossaryMock),
  );

  useEffect(() => {
    const filteredItems = findGlossaryItems(sortedGlossaryData, inputValue);
    setGlossaryItems(filteredItems);
  }, [sortedGlossaryData, inputValue]);
  /* search end */

  /* A-Z menu start */
  const [anchorElMenu, setAnchorElMenu] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };
  /* A-Z menu end */

  /* menu items start */
  const firstCharsArray = Object.keys(sortedGlossaryData).map(key => {
    const firstChar = key.charAt(0).toUpperCase();
    if (isLetter(firstChar)) {
      return firstChar;
    }
    return NON_LETTER_MENU_BUTTON;
  });
  const uniqChars = [...new Set(firstCharsArray)];
  /* menu items end */

  return {
    inputRef,
    handleInputChange,
    anchorElMenu,
    handleOpenMenu,
    handleCloseMenu,
    glossaryItems,
    menuItems: uniqChars,
  };
};
