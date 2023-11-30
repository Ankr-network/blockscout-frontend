import { ReactNode } from 'react';

import { ProjectSidebarDescription } from '../ProjectSidebarDescription';
import { ProjectSidebarTitle } from '../ProjectSidebarTitle';
import { useWhitelistItemFormStyles } from './useWhitelistItemFormStyles';

export interface WhitelistItemFormProps {
  attention?: ReactNode;
  counter: ReactNode;
  description: string;
  input: ReactNode;
  selector: ReactNode;
  title: string;
}

export const WhitelistItemForm = ({
  attention,
  counter,
  description,
  input,
  selector,
  title,
}: WhitelistItemFormProps) => {
  const { classes } = useWhitelistItemFormStyles();

  return (
    <div>
      <ProjectSidebarTitle className={classes.title}>
        {title}
      </ProjectSidebarTitle>
      <ProjectSidebarDescription className={classes.description}>
        {description}
      </ProjectSidebarDescription>
      {attention}
      <div className={classes.counter}>{counter}</div>
      <div className={classes.input}>{input}</div>
      <div className={classes.selector}>{selector}</div>
    </div>
  );
};
