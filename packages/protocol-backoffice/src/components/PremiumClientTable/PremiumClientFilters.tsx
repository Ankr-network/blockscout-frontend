import { Button, Space } from 'antd';
import { UserTypeTag } from '../UserTypeTag';
import { ClientType, PremiumPlanClientEntity } from '../../types';
import { observer } from 'mobx-react';

interface IPremiumClientFilters {
  filterKey?: keyof PremiumPlanClientEntity;
  filterClientType?: ClientType;
  handleFilterClientType: (clientType: ClientType) => void;
  handleFilterKey: (key: keyof PremiumPlanClientEntity) => void;
  clientTypeFilters: ClientType[];
}

export const PremiumClientFilters: React.FC<IPremiumClientFilters> = observer(
  ({
    filterKey,
    filterClientType,
    handleFilterClientType,
    handleFilterKey,
    clientTypeFilters,
  }) => {
    return (
      <Space style={{ marginBottom: 20 }}>
        Filters:
        {clientTypeFilters.map(i => (
          <Button
            key={i}
            onClick={() => handleFilterClientType(i)}
            type={filterClientType === i ? 'primary' : 'default'}
          >
            <UserTypeTag clientType={i} isTextInline={false} />
          </Button>
        ))}
        <Button
          onClick={() => handleFilterKey('email')}
          type={filterKey === 'email' ? 'primary' : 'default'}
        >
          hasEmail
        </Button>
      </Space>
    );
  },
);
