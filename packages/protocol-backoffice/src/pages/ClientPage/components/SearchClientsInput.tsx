import React from 'react';
import { Button, Input, Tooltip } from 'antd';
import { observer } from 'mobx-react';
import { ClientEmailsStore } from 'stores/ClientEmailsStore';
import { LocalGridStore } from 'stores/LocalGridStore';
import { PremiumPlanClientEntity } from 'types';
import { useSearchInput } from './useSearchInput';

interface ISearchClientsInputProps {
  emailStore: ClientEmailsStore;
  gridStore: LocalGridStore<PremiumPlanClientEntity>;
}

export const SearchClientsInput = observer(
  ({ emailStore, gridStore }: ISearchClientsInputProps) => {
    const { foundClients, onChange, searchValue, onClientClick } =
      useSearchInput(emailStore, gridStore);

    return (
      <div
        style={{
          position: 'absolute',
          right: '260px',
          width: '250px',
          top: '20px',
        }}
      >
        <Input
          placeholder="Search by email or address"
          allowClear
          onChange={onChange}
          disabled={emailStore.isLoading || gridStore.isLoading}
        />
        {foundClients?.length > 0 && (
          <ul
            style={{
              width: '100%',
              padding: 0,
              position: 'relative',
              zIndex: 99,
              maxHeight: 200,
              overflow: 'auto',
              backgroundColor: 'white',
            }}
          >
            {searchValue &&
              foundClients.map(client => {
                const title = client.email
                  ? `${client.email}\n${client.address}`
                  : client.address;
                return (
                  <li
                    key={client.user || client.address || client.email}
                    style={{
                      listStyle: 'none',
                    }}
                  >
                    <Tooltip placement="left" title={title}>
                      <Button
                        block
                        type="text"
                        style={{ textAlign: 'left' }}
                        onClick={() => onClientClick(client.address!)}
                      >
                        {client.email || client.address}
                      </Button>
                    </Tooltip>
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    );
  },
);
