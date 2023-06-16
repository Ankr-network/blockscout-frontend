import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';

export const getSubChainFromGroup = (group: EndpointGroup) => {
  const { chains: [subChain, additionalSubChain] = [] } = group;

  // horizen testnet has no endpoints, so we need to use horizen testnet evm to display endpoints.
  const isHorizen = group.id === ChainGroupID.HORIZEN;
  return isHorizen ? additionalSubChain : subChain;
};
