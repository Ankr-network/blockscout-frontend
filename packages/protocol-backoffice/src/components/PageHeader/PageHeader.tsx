import { PageHeader as OriginalPageHeader, PageHeaderProps } from 'antd';
import { observer } from 'mobx-react';

export const PageHeader = observer(
  ({ title, subTitle, ...otherProps }: PageHeaderProps) => {
    return (
      <>
        <OriginalPageHeader
          className="site-page-header"
          {...otherProps}
          title={title || 'Unknown Page'}
          subTitle={subTitle || ''}
        />
      </>
    );
  },
);
