import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { GlossarySearch } from './components/GlossarySearch';
import { GlossaryList } from './components/GlossaryList';
import { t } from 'modules/i18n/utils/intl';

import { useGlossary } from './useGlossary';
import { useGlossaryStyles } from './GlossaryStyles';

export const Glossary = () => {
  const classes = useGlossaryStyles();
  const {
    inputRef,
    handleInputChange,
    anchorElMenu,
    handleOpenMenu,
    handleCloseMenu,
    glossaryItems,
    menuItems,
  } = useGlossary();

  return (
    <section className={classes.root}>
      <Container className={classes.containerGlossary} maxWidth="md">
        <Typography className={classes.title} variant="h1" align="center">
          {t('glossary.title')}
        </Typography>

        <GlossarySearch
          inputRef={inputRef}
          handleInputChange={handleInputChange}
          anchorElMenu={anchorElMenu}
          handleOpenMenu={handleOpenMenu}
          handleCloseMenu={handleCloseMenu}
          menuItems={menuItems}
        />

        <GlossaryList glossaryItems={glossaryItems} />
      </Container>
    </section>
  );
};
