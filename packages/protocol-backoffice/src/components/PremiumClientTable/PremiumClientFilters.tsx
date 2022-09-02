import { Button } from 'antd';
import { UserTypeTag } from '../UserTypeTag';
import { ClientType, PremiumPlanClientEntity } from '../../types';

interface IPremiumClientFilters {
  filterKey?: keyof PremiumPlanClientEntity;
  filterClientType?: ClientType;
  handleFilterClientType: (clientType: ClientType) => void;
  handleFilterKey: (key: keyof PremiumPlanClientEntity) => void;
  clientTypeFilters: ClientType[];
}

export const PremiumClientFilters: React.FC<IPremiumClientFilters> = ({
  filterKey,
  filterClientType,
  handleFilterClientType,
  handleFilterKey,
  clientTypeFilters,
}) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <span>Filters:</span>
      {clientTypeFilters.map(i => (
        <Button
          key={i}
          onClick={() => handleFilterClientType(i)}
          type={filterClientType === i ? 'primary' : 'default'}
          style={{ margin: '0 5px' }}
        >
          <UserTypeTag clientType={i} isTextInline={false} />
        </Button>
      ))}

      <Button
        key="email"
        onClick={() => handleFilterKey('email')}
        type={filterKey === 'email' ? 'primary' : 'default'}
        style={{ margin: '0 5px' }}
      >
        hasEmail
      </Button>
    </div>
  );
};
