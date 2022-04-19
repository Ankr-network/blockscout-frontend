import React from 'react';
import { Button, Typography, Box } from '@material-ui/core';
import { FieldArray } from 'react-final-form-arrays';

import { ReactComponent as TrashBinIcon } from 'uiKit/Icons/trashBin.svg';
import { useStyles } from './AddressFieldsStyles';

interface AddressFieldsProps {
  title: string;
  name: string;
  onButtonClick: (index: number) => void;
}

export const AddressFields = ({
  title,
  onButtonClick,
  name: fieldName,
}: AddressFieldsProps) => {
  const classes = useStyles();

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
                  <Typography variant="subtitle1" noWrap>
                    {formDomain}
                  </Typography>
                  <Button
                    variant="text"
                    className={classes.deleteButton}
                    onClick={() => onButtonClick(index)}
                  >
                    <TrashBinIcon className={classes.icon} />
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
