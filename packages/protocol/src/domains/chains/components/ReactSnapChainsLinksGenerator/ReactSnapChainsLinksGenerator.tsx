import { Fragment } from 'react';

import { Chain } from 'domains/chains/types';
import { NavLink } from 'uiKit/NavLink';
import { EnterpriseRoutesConfig } from 'domains/enterprise/routes';
import { ChainsRoutesConfig } from 'domains/chains/routes';

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
              <NavLink
                isRouterLink
                href={ChainsRoutesConfig.chainDetails.generatePath(
                  rootChainID,
                  id,
                )}
              />

              {!!subchains.length && (
                <SubChainLinksGenerator
                  rootChainID={rootChainID}
                  chains={subchains}
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
}

export const ReactSnapChainsLinksGenerator = ({
  chains,
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
            <NavLink
              isRouterLink
              href={ChainsRoutesConfig.chainDetails.generatePath(id)}
            />
            <NavLink
              isRouterLink
              href={EnterpriseRoutesConfig.chainDetails.generatePath(id)}
            />
            <NavLink
              isRouterLink
              href={ChainsRoutesConfig.addEndpoint.generatePath(id)}
            />

            <SubChainLinksGenerator
              rootChainID={id}
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
