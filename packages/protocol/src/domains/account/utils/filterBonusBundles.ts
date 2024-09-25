import { IBundleEntity } from 'multirpc-sdk';

import { B2B_REFERRAL_PROGRAMS } from 'modules/referralProgram/const';

export const filterBonusBundles = (bundles: IBundleEntity[]) =>
  bundles?.filter(bundle => {
    const isBonusBundle = B2B_REFERRAL_PROGRAMS.some(
      program => program.bundleId === bundle.bundle.bundle_id,
    );

    return !isBonusBundle;
  }) ?? [];
