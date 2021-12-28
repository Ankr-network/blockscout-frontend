import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { lesson } from './lessonMock';
import { useLessonStyles } from './LessonStyles';
import { LessonBlock } from './components/LessonBlock/LessonBlock';
import { useLesson } from './useLesson';

export const Lesson = () => {
  const classes = useLessonStyles();
  const { loadNextBlock, blocksToRender } = useLesson();

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Typography className={classes.title} variant="h1" align="center">
          {lesson.title}
        </Typography>

        {blocksToRender.map(i => (
          <LessonBlock
            key={i.id}
            id={i.id}
            blockContent={i.blockContent}
            userAction={i.userAction}
            loadNextBlock={loadNextBlock}
          />
        ))}
      </Container>
    </section>
  );
};
