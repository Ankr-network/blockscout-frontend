import React from 'react';
import { Box, Typography } from '@mui/material';
import { uid } from 'react-uid';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';
import { ChainID } from 'modules/chains/types';

import { Question } from './components/Question/Question';
import { faqTranslation } from './translation';
import { useFAQStyles } from './useFAQStyles';

interface FAQProps {
  chainId: ChainID;
}

export const FAQ = ({ chainId }: FAQProps) => {
  const { classes } = useFAQStyles();
  const { keys, t, tHTML } = useTranslation(faqTranslation);
  const currentChainTranslations = keys[chainId as keyof typeof keys];

  if (!currentChainTranslations) {
    return null;
  }

  const generalContent = {
    left: [
      {
        title: t(currentChainTranslations.item1Title),
        content: tHTML(currentChainTranslations.item1Description),
      },
      {
        title: t(currentChainTranslations.item2Title),
        content: tHTML(currentChainTranslations.item2Description),
      },
      {
        title: t(currentChainTranslations.item3Title),
        content: tHTML(currentChainTranslations.item3Description),
      },
    ],
    right: [
      {
        title: t(currentChainTranslations.item4Title),
        content: tHTML(currentChainTranslations.item4Description),
      },
      {
        title: t(currentChainTranslations.item5Title),
        content: tHTML(currentChainTranslations.item5Description),
      },
      {
        title: t(currentChainTranslations.item6Title),
        content: tHTML(currentChainTranslations.item6Description),
      },
    ],
  };

  return (
    <Box className={classes.component}>
      <Typography variant="h2" className={classes.title}>
        {t(currentChainTranslations.title)}
      </Typography>
      <Box
        className={classes.faqsWrapper}
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <Box className={classes.faqSectionWrapper}>
          <Box className={classes.faqSection}>
            <Box className={classes.column}>
              {generalContent.left.map(
                ({ content, title }, index, currentArr) => (
                  <Question
                    isUnderlined={currentArr.length !== index + 1}
                    key={uid(title)}
                    question={{ title, content }}
                  />
                ),
              )}
            </Box>
            <Box className={classes.column}>
              {generalContent.right.map(
                ({ content, title }, index, currentArr) => (
                  <Question
                    isUnderlined={currentArr.length !== index + 1}
                    key={uid(title)}
                    question={{ title, content }}
                  />
                ),
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
