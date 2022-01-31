import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { uid } from 'react-uid';
import { Spinner } from 'ui';

import { ModuleEntityBlock } from 'domains/library/components/ModuleEntityBlock';
import { useExam } from './useExam';
import { useExamStyles } from './ExamStyles';

export const Exam = () => {
  const classes = useExamStyles();
  const { examTitle, loadNextBlock, blocksToRender, glossaryData, loading } =
    useExam();

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className={classes.rootExam}>
      <Container className={classes.containerExam} maxWidth="md">
        <Typography className={classes.title} variant="h1" align="center">
          {examTitle}
        </Typography>

        {blocksToRender.map(i => (
          <ModuleEntityBlock
            key={uid(i.id)}
            id={i.id}
            blockContent={i.blockContent}
            userAction={i.userAction}
            loadNextBlock={loadNextBlock}
            glossaryData={glossaryData}
          />
        ))}
      </Container>
    </section>
  );
};
