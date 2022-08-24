import { UserOutlined } from '@ant-design/icons';
import { Space, Tag, TagProps, Typography } from 'antd';
import { ClientEntity } from 'types';
import { clientTypeNaming, colorMap, getClientTypeExpiration } from './const';

const { Text } = Typography;

type TUserTypeTagProps = Exclude<TagProps, 'color' | 'children'> & {
  clientType: ClientEntity['type'];
  clientTtl?: ClientEntity['ttl'];
  isTextInline: boolean;
};

export const UserTypeTag = ({
  clientType,
  clientTtl,
  isTextInline,
  ...otherProps
}: TUserTypeTagProps) => {
  const label = clientTypeNaming[clientType];
  const expiration =
    clientTtl && getClientTypeExpiration[clientType]?.(clientTtl);

  return (
    <Space direction={isTextInline ? 'horizontal' : 'vertical'}>
      <Tag icon={<UserOutlined />} color={colorMap[clientType]} {...otherProps}>
        {label}
      </Tag>

      {expiration && (
        <Text type="secondary" italic>
          {expiration}
        </Text>
      )}
    </Space>
  );
};
