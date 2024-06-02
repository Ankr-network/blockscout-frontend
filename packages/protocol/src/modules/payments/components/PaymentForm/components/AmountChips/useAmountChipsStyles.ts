import { makeStyles } from 'tss-react/mui';

export interface IUseAmountChipsStylesProps {
  columns: number;
}

export const useAmountChipsStyles = makeStyles<IUseAmountChipsStylesProps>()(
  (theme, { columns }) => ({
    amountChipsRoot: {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: theme.spacing(3, 1),
    },
    chip: {
      border: 'none',
      width: '100%',
    },
  }),
);
