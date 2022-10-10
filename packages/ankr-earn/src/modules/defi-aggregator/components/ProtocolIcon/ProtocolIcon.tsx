import { useProtocolIconStyles } from './useProtocolIconStyles';

interface IProtocolIconProps {
  src: string;
  alt?: string;
}

export const ProtocolIcon = ({ src, alt }: IProtocolIconProps): JSX.Element => {
  const classes = useProtocolIconStyles();

  return <img alt={alt} className={classes.root} src={src} />;
};
