import classNames from 'classnames';

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
}: IProjectMetaProps): JSX.Element => {
  const classes = useProjectMetaStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <img alt={description ?? name} className={classes.img} src={img} />

      {name}
    </div>
  );
};
