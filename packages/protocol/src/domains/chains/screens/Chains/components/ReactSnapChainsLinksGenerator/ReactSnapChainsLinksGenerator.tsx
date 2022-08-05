import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainsRoutesConfig } from 'domains/chains/routes';

import { NavLink } from 'ui';

interface IReactSnapChainsLinksGeneratorProps {
  chains: IApiChain[];
}

export const ReactSnapChainsLinksGenerator = ({
  chains,
}: IReactSnapChainsLinksGeneratorProps) => {
  return (
    <>
      {chains.map(({ id, testnets = [], devnets = [] }) => (
        <>
          <NavLink
            isRouterLink
            href={ChainsRoutesConfig.chainDetails.generatePath(id)}
          />
          <NavLink
            isRouterLink
            href={ChainsRoutesConfig.addEndpoint.generatePath(id)}
          />
          {testnets.map(({ id: testNetId }) => (
            <NavLink
              isRouterLink
              href={ChainsRoutesConfig.chainDetails.generatePath(id, testNetId)}
            />
          ))}
          {devnets.map(({ id: testNetId }) => (
            <NavLink
              isRouterLink
              href={ChainsRoutesConfig.chainDetails.generatePath(id, testNetId)}
            />
          ))}
        </>
      ))}
    </>
  );
};
