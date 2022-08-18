import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { Fragment } from 'react';

import { NavLink } from 'ui';

interface ISubChainLinksGeneratorProps
  extends IReactSnapChainsLinksGeneratorProps {
  rootChainID: IApiChain['id'];
}

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
          testnets = [],
          devnets = [],
          extensions = [],
          extenders = [],
        }) => {
          const subchains = [
            ...testnets,
            ...devnets,
            ...extensions,
            ...extenders,
          ];

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
  chains: IApiChain[];
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
              href={ChainsRoutesConfig.addEndpoint.generatePath(id)}
            />

            <SubChainLinksGenerator
              rootChainID={id}
              chains={[...testnets, ...devnets, ...extensions, ...extenders]}
            />
          </Fragment>
        ),
      )}
    </>
  );
};
