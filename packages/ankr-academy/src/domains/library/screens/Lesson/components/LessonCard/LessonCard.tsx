import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Paper, Typography } from '@material-ui/core';
import { LessonType } from '../../../../types';
import { LibraryRoutesConfig } from 'domains/library/LibraryRouterConfig';
import { t } from 'modules/i18n/utils/intl';
import { useLessonCardStyles } from './LessonCardStyles';

interface ILessonCardProps {
  lesson: LessonType;
}

export const LessonCard = ({
  lesson: { id, index, title, timeToRead, imgPreview },
}: ILessonCardProps) => {
  const classes = useLessonCardStyles();

  return (
    <Paper className={classes.root} component="section">
      <img
        className={classes.imgPreview}
        src={imgPreview}
        alt="lesson preview"
      />
      <Typography className={classes.lessonIndex} color="primary">
        {t('lesson-card.class-index', { index })}
      </Typography>
      <Typography className={classes.lessonTitle} component="h3" variant="h3">
        {title}
      </Typography>
      <Typography
        className={classes.timeToRead}
        variant="body2"
        color="textSecondary"
      >
        {timeToRead}
      </Typography>

      <Button
        component={Link}
        className={classes.btn}
        color="secondary"
        to={LibraryRoutesConfig.lesson.generatePath(id)}
      >
        {t('lesson-card.next-lesson-btn')}
      </Button>
    </Paper>
  );
};
