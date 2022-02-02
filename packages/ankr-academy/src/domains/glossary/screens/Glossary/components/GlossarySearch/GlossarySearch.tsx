import React, { RefObject, useState } from 'react';
import { uid } from 'react-uid';
import classNames from 'classnames';
import { Button, IconButton, InputBase, Menu, Paper } from '@material-ui/core';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { isLetter } from 'utils';
import { NON_LETTER_ID } from 'domains/glossary/const';
import { useGlossarySearchStyles } from './GlossarySearchStyles';

interface IGlossarySearchProps {
  inputRef: RefObject<HTMLInputElement>;
  handleInputChange: (
    event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  anchorElMenu: null | HTMLElement;
  handleOpenMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseMenu: () => void;
  menuItems: string[];
}

export const GlossarySearch = ({
  inputRef,
  handleInputChange,
  anchorElMenu,
  handleOpenMenu,
  handleCloseMenu,
  menuItems,
}: IGlossarySearchProps) => {
  const classes = useGlossarySearchStyles();
  const isMenuOpened = Boolean(anchorElMenu);

  const [toScrollElement, setToScrollElement] = useState<HTMLElement>();

  const handleMenuItemClick = (letter: string) => {
    const id = isLetter(letter) ? letter.toLowerCase() : NON_LETTER_ID;
    const element = document.getElementById(`${id}`);
    if (!element) return;
    // setting element to scroll after menu is closed
    setToScrollElement(element);
    handleCloseMenu();
  };

  const onClose = () => {
    // removing element to scroll if menu is closed manually
    setToScrollElement(undefined);
    handleCloseMenu();
  };

  return (
    <Paper
      component="form"
      className={classes.root}
      onClick={() => inputRef.current?.focus()}
    >
      <IconButton disabled aria-label="menu">
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        color="primary"
        placeholder="Search terms"
        inputProps={{ 'aria-label': 'Search terms' }}
        inputRef={inputRef}
        onChange={handleInputChange}
      />

      <Button
        className={classNames(
          classes.menuButton,
          isMenuOpened && classes.menuButtonActive,
        )}
        aria-label="alphabet"
        aria-controls="glossary-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleOpenMenu}
      >
        A-Z
      </Button>
      <Menu
        id="glossary-menu"
        anchorEl={anchorElMenu}
        open={isMenuOpened}
        onClose={onClose}
        classes={{
          paper: classes.menuPaper,
          list: classes.menuList,
        }}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        TransitionProps={{
          onExited: () =>
            toScrollElement?.scrollIntoView({ behavior: 'smooth' }),
        }}
      >
        {menuItems.map(char => {
          return (
            <Button
              key={uid(char)}
              className={classes.letterBtn}
              onClick={() => handleMenuItemClick(char)}
            >
              {char}
            </Button>
          );
        })}
      </Menu>
    </Paper>
  );
};
