import { forwardRef, LegacyRef, ReactNode } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { t } from 'common';

import { useCopyTokenAddressHook } from 'modules/common/hooks/useCopyTokenAddressHook';
import { Menu } from 'uiKit/Menu';

export interface ICopyTokenAddressProps {
  address: string;
  wrapper?: ({ children }: { children: ReactNode }) => JSX.Element;
}

export const CopyTokenAddress = forwardRef(
  (
    { address }: ICopyTokenAddressProps,
    ref: LegacyRef<CopyToClipboard>,
  ): JSX.Element => {
    const { isCopied, handleCopy } = useCopyTokenAddressHook();

    return (
      <CopyToClipboard ref={ref} text={address} onCopy={handleCopy}>
        <Menu.Item>
          {isCopied
            ? t('dashboard.copied')
            : t('dashboard.card.copyTokenAddress')}
        </Menu.Item>
      </CopyToClipboard>
    );
  },
);
