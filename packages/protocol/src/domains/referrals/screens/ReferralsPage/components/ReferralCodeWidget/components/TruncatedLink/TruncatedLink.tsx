import { useTruncatedLinkStyles } from './useTruncatedLinkStyles';

export interface ITruncatedLinkProps {
  code: string | undefined;
  link: string | undefined;
}

export const TruncatedLink = ({
  code = '',
  link = '',
}: ITruncatedLinkProps) => {
  const { classes } = useTruncatedLinkStyles();
  const [linkStart] = link.split(code);

  return (
    <div className={classes.root}>
      <div className={classes.linkStart}>{linkStart}</div>
      <div>{code}</div>
    </div>
  );
};
