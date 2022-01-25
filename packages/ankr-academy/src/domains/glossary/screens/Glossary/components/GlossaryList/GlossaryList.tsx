import React from 'react';
import { uid } from 'react-uid';
import { Paper, Typography } from '@material-ui/core';
import { GlossaryMock } from '../../../../types';
import { NON_LETTER_ID } from '../../../../const';
import { isLetter } from '../../../../../../utils/isLetter';

import { useGlossaryListStyles } from './GlossaryListStyles';

interface IGlossaryListProps {
  glossaryItems: GlossaryMock;
}

export const GlossaryList = ({ glossaryItems }: IGlossaryListProps) => {
  const classes = useGlossaryListStyles();

  return (
    <>
      {Object.entries(glossaryItems).map(([key, { value }]) => {
        const firstCharForCurrentKey = key.charAt(0).toLowerCase();
        const currentChar = isLetter(firstCharForCurrentKey)
          ? firstCharForCurrentKey
          : NON_LETTER_ID;

        return (
          // scroll to letter is working by this ids
          <div key={uid(key)} id={currentChar}>
            <br />
            <Paper>
              <Typography className={classes.title} variant="h4">
                {key}
              </Typography>
              <Typography className={classes.title} variant="body1">
                {value}
              </Typography>
            </Paper>
          </div>
        );
      })}
    </>
  );
};
