import React from 'react';
import { uid } from 'react-uid';
import { Redirect, Link } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { GlossaryRouterConfig } from 'domains/glossary/GlossaryRouterConfig';
import { MarkdownContentWrapper } from 'domains/library/components/MarkdownContentWrapper';
import { Spinner } from 'ui';

import { useGlossaryTerm } from './useGlossaryTerm';
import { GlossaryItem } from '../Glossary/components/GlossaryList/GlossaryItem';
import { getTermById } from './GlossaryTermUtils';
import { useGlossaryTermStyles } from './GlossaryTermStyles';

export const GlossaryTerm = () => {
  const classes = useGlossaryTermStyles();
  const { currentTerm, glossaryData, loading } = useGlossaryTerm();

  if (loading) {
    return <Spinner />;
  }

  if (!currentTerm) {
    console.error(`term not found`);
    return <Redirect to={GlossaryRouterConfig.glossary.generatePath()} />;
  }

  const { key, quote } = currentTerm;

  return (
    <section>
      <Container maxWidth="md">
        <Typography variant="body2" color="textSecondary">
          Glossary/
        </Typography>
        <Typography variant="h2">{key}</Typography>

        {/* TODO: tags */}

        <MarkdownContentWrapper
          glossaryData={glossaryData}
          className={classes.quote}
          messagesList={[quote]}
        />

        {/* TODO: share */}

        {currentTerm.description && (
          <MarkdownContentWrapper
            glossaryData={glossaryData}
            className={classes.description}
            messagesList={currentTerm.description}
          />
        )}

        {currentTerm.connectedTerms && (
          <Box marginTop={{ xs: 10, md: 15 }}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h4">Connected terms</Typography>
              <Button
                component={Link}
                className={classes.showAllBtn}
                to={GlossaryRouterConfig.glossary.generatePath()}
              >
                Show all
              </Button>
            </Box>
            {currentTerm.connectedTerms.map(term => {
              const connectedTerm = getTermById(term, glossaryData);
              if (!connectedTerm) return null;

              const { termId, key: termTitle, value } = connectedTerm;
              return (
                <GlossaryItem
                  key={uid(termId)}
                  href={GlossaryRouterConfig.glossaryTerm.generatePath(termId)}
                  termTitle={termTitle}
                  value={value}
                />
              );
            })}
          </Box>
        )}

        {/* TODO: Related content */}
      </Container>
    </section>
  );
};
