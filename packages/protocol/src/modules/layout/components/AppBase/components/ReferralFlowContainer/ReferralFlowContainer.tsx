import {
  ReferralFlow,
  useReferralFlow,
} from 'modules/referralProgram/components/ReferralFlow';

export const ReferralFlowContainer = () => {
  const { referralFlowProps } = useReferralFlow();

  return <ReferralFlow {...referralFlowProps} />;
};
