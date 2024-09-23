import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { FieldArray } from 'react-final-form-arrays';
import { Delete } from '@ankr.com/ui';

import { useStyles } from './AddressFieldsStyles';

interface AddressFieldsProps {
  title: string;
  name: string;
  onButtonClick: (index: number) => void;
}

export const AddressFields = ({
  name: fieldName,
  onButtonClick,
  title,
}: AddressFieldsProps) => {
  const { classes } = useStyles();

  return (
    <>
      <Typography variant="body2" className={classes.title}>
        {title}
      </Typography>
      <Box className={classes.domainRows}>
        <FieldArray name={fieldName}>
          {({ fields }) =>
            fields.map((name, index) => {
              const formDomain = fields.value[index];

              return (
                <Box className={classes.domainRow} key={index}>
                  <Typography
                    variant="subtitle1"
                    noWrap
                    className={classes.content}
                  >
                    {formDomain}
                  </Typography>
                  <Button
                    variant="text"
                    className={classes.deleteButton}
                    onClick={() => onButtonClick(index)}
                  >
                    <Delete className={classes.icon} />
                  </Button>
                </Box>
              );
            })
          }
        </FieldArray>
      </Box>
    </>
  );
};
