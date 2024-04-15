import checkMarkSrc from './assets/check-mark.png';
import { useCheckMarkImageStyles } from './useCheckMarkImageStyles';

export interface ICheckMarkImageProps {
  className?: string;
}

export const CheckMarkImage = ({ className }: ICheckMarkImageProps) => {
  const { classes, cx } = useCheckMarkImageStyles();

  return (
    <img
      alt="check mark"
      className={cx(classes.root, className)}
      src={checkMarkSrc}
    />
  );
};
