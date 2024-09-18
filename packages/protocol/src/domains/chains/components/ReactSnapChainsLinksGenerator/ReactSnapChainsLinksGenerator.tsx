import { Fragment } from 'react';
import { Chain } from '@ankr.com/chains-list';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { EnterpriseRoutesConfig } from 'domains/enterprise/routes';
import { NavLink } from 'uiKit/NavLink';

interface ISubChainLinksGeneratorProps
  extends IReactSnapChainsLinksGeneratorProps {
  rootChainID: Chain['id'];
}

const flatProtocolSubchains = (chains: Chain[]) =>
  chains.reduce<Chain[]>((acc, cur) => {
    acc.push(cur);
    acc.concat(cur.beacons || []);
    acc.concat(cur.opnodes || []);

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
          beacons = [],
          devnets = [],
          extenders = [],
          extensions = [],
          id,
          name,
          opnodes = [],
          testnets = [],
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
          beacons = [],
          devnets = [],
          extenders = [],
          extensions = [],
          id,
          name,
          testnets = [],
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
