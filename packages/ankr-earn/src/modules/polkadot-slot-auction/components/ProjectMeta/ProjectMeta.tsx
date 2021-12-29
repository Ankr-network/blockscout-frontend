import classNames from 'classnames';
import React from 'react';
import { useProjectMetaStyles } from './useProjectMetaStyles';

interface IProjectMetaProps {
  img: string;
  name: string;
  description?: string;
  className?: string;
}

export const ProjectMeta = ({
  img,
  name,
  description,
  className,
}: IProjectMetaProps) => {
  const classes = useProjectMetaStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <img src={img} alt={description ?? name} className={classes.img} />
      {name}
    </div>
  );
};
