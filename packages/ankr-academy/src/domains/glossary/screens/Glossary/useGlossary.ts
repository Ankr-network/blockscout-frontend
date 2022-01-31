import React, { useEffect, useRef, useState } from 'react';
import { NON_LETTER_MENU_BUTTON } from 'domains/glossary/const';
import { isLetter } from 'utils';
import { findGlossaryItems } from './GlossaryUtils';
import { GlossaryMappedData } from '../../types';
import { useGlossaryData } from '../../hooks';

export const useGlossary = () => {
  /* request glossary start */
  const { data: glossaryData, loading } = useGlossaryData();
  /* request glossary end */

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
  const [glossaryItems, setGlossaryItems] =
    useState<GlossaryMappedData>(glossaryData);

  useEffect(() => {
    const filteredItems = findGlossaryItems(glossaryData, inputValue);
    setGlossaryItems(filteredItems);
  }, [glossaryData, inputValue]);
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
  const firstCharsArray =
    glossaryData &&
    Object.keys(glossaryData).map(key => {
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
    loading,
  };
};
