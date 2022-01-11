import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { uid } from 'react-uid';
import { LessonBlock } from './components/LessonBlock/LessonBlock';
import { LessonCard } from './components/LessonCard/LessonCard';
import { useLesson } from './useLesson';
import { useLessonStyles } from './LessonStyles';

export const Lesson = () => {
  const classes = useLessonStyles();
  const {
    lessonTitle,
    loadNextBlock,
    blocksToRender,
    isLessonFinished,
    nextLesson,
  } = useLesson();

  return (
    <section className={classes.root}>
      <Container className={classes.containerLesson} maxWidth="md">
        <Typography className={classes.title} variant="h1" align="center">
          {lessonTitle}
        </Typography>

        {blocksToRender.map(i => (
          <LessonBlock
            key={uid(i.id)}
            id={i.id}
            blockContent={i.blockContent}
            userAction={i.userAction}
            loadNextBlock={loadNextBlock}
          />
        ))}
      </Container>
      <Container className={classes.conainerNextLesson} maxWidth="lg">
        {isLessonFinished && <LessonCard lesson={nextLesson} />}
      </Container>
    </section>
  );
};
