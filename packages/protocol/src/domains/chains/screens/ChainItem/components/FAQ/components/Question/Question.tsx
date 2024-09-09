import React, { useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { uid } from 'react-uid';

import { useIsSMDown } from 'uiKit/Theme/useTheme';

import { ReactComponent as PlusIcon } from './assets/plus.svg';
import { ReactComponent as MinusIcon } from './assets/minus.svg';
import { QuestionsType } from './types';
import { useQuestionStyles } from './useQuestionStyles';

type Props = {
  question: QuestionsType;
  isUnderlined?: boolean;
};

export const Question = ({ isUnderlined, question }: Props) => {
  const { classes, cx } = useQuestionStyles();
  const isSMDown = useIsSMDown();
  const [isOpened, setIsOpened] = useState(false);
  const questionTitleRef = useRef<HTMLDivElement | null>(null);
  const questionTitleElement = questionTitleRef?.current;

  return (
    <Box
      className={cx(
        classes.questionItemWrapper,
        isUnderlined && !isSMDown ? classes.underlined : '',
      )}
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
      style={{
        maxHeight:
          !isOpened && questionTitleElement
            ? `${questionTitleElement?.clientHeight + 35}px`
            : 'unset',
      }}
    >
      <Box
        onClick={() => setIsOpened(prevState => !prevState)}
        className={classes.header}
      >
        <Box key={uid(question.title)} className={classes.iconWrapper}>
          {isOpened ? <MinusIcon /> : <PlusIcon />}
        </Box>
        <Typography
          ref={questionTitleRef}
          variant="h3"
          itemProp="name"
          className={cx(
            classes.questionTitle,
            isOpened ? classes.questionTitleActive : '',
          )}
        >
          {question.title}
        </Typography>
      </Box>
      <Box className={classes.content}>
        <Box
          itemScope
          itemType="https://schema.org/Answer"
          itemProp="acceptedAnswer"
          className={classes.questionText}
        >
          <div itemProp="text">{question.content}</div>
        </Box>
      </Box>
    </Box>
  );
};
