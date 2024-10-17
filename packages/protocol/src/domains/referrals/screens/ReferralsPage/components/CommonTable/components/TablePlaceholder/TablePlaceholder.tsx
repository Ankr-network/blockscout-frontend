import { CopyReferralLinkButton } from 'domains/referrals/screens/ReferralsPage/components/CopyReferralLinkButton';
import { DataPlaceholder } from 'modules/common/components/DataPlaceholder';

import { useTablePlaceholderStyles } from './useTablePlaceholderStyles';

export interface ITablePlaceholderProps {
  className?: string;
  hasCopyLinkButton?: boolean;
  text: string;
}

export const TablePlaceholder = ({
  className,
  hasCopyLinkButton,
  text,
}: ITablePlaceholderProps) => {
  const { classes } = useTablePlaceholderStyles();

  return (
    <DataPlaceholder className={className} text={text}>
      {hasCopyLinkButton && (
        <CopyReferralLinkButton className={classes.copyLinkButton} />
      )}
    </DataPlaceholder>
  );
};
