import { Fragment } from 'react';

import { Chain } from 'domains/chains/types';
import { NavLink } from 'uiKit/NavLink';

interface ISubChainLinksGeneratorProps
  extends IReactSnapChainsLinksGeneratorProps {
  rootChainID: Chain['id'];
}

const flatProtocolSubchains = (chains: Chain[]) =>
  chains.reduce<Chain[]>((acc, cur) => {
    acc.push(cur);
    acc.concat(cur.beacons ?? []);
    acc.concat(cur.opnodes ?? []);

    return acc;
  }, []);

const SubChainLinksGenerator = ({
  chains,
  rootChainID,
  chainLinkBuilder,
  addEndpointLinkBuilder,
}: ISubChainLinksGeneratorProps) => {
  return (
    <>
      {chains.map(
        ({
          name,
          id,
          beacons = [],
          testnets = [],
          devnets = [],
          extensions = [],
          extenders = [],
          opnodes = [],
        }) => {
          const subchains = flatProtocolSubchains([
            ...testnets,
            ...devnets,
            ...extensions,
            ...extenders,
            ...beacons,
            ...opnodes,
          ]);

          return (
            <Fragment key={name}>
              <NavLink isRouterLink href={chainLinkBuilder(rootChainID, id)} />

              {!!subchains.length && (
                <SubChainLinksGenerator
                  rootChainID={rootChainID}
                  chains={subchains}
                  chainLinkBuilder={chainLinkBuilder}
                  addEndpointLinkBuilder={addEndpointLinkBuilder}
                />
              )}
            </Fragment>
          );
        },
      )}
    </>
  );
};

interface IReactSnapChainsLinksGeneratorProps {
  chains: Chain[];
  chainLinkBuilder: (id: string, netId?: string) => string;
  addEndpointLinkBuilder?: (id: string, netId?: string) => string;
}

export const ReactSnapChainsLinksGenerator = ({
  chains,
  chainLinkBuilder,
  addEndpointLinkBuilder,
}: IReactSnapChainsLinksGeneratorProps) => {
  return (
    <>
      {chains.map(
        ({
          name,
          id,
          beacons = [],
          testnets = [],
          devnets = [],
          extensions = [],
          extenders = [],
        }) => (
          <Fragment key={name}>
            <NavLink isRouterLink href={chainLinkBuilder(id)} />

            {addEndpointLinkBuilder && (
              <NavLink isRouterLink href={addEndpointLinkBuilder(id)} />
            )}

            <SubChainLinksGenerator
              rootChainID={id}
              chainLinkBuilder={chainLinkBuilder}
              addEndpointLinkBuilder={addEndpointLinkBuilder}
              chains={[
                ...testnets,
                ...devnets,
                ...extensions,
                ...extenders,
                ...beacons,
              ]}
            />
          </Fragment>
        ),
      )}
    </>
  );
};
