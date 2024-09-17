import { Locale } from 'modules/i18n';

export const termsSectionTranslation = {
  [Locale.en]: {
    title: 'Terms and conditions',
    overview: {
      title: 'Overview',
      description:
        '<ul><li>Ankr may offer a referral program ("Referral Program") to incentivize users to refer new customers to our Services. By participating in the Referral Program, you agree to comply with the following terms and conditions, as well as the rest of the Terms of Use Agreement.</li></ul>',
    },
    eligibility: {
      title: 'Eligibility',
      description:
        '<ul><li>Referral: The person who is invited, eligible if either has no account or has a Freemium account (never had a Premium account) and should not have used any other referral code before. Each account can only be bound to one referrer.</li><li>Referrer: All registered users of Ankr are eligible to be referrers.</li></ul>',
    },
    rewardsEarning: {
      title: 'How to Earn Referral Rewards',
      description:
        '<ul><li>The referrer sends an invite to a potential new user.</li><li>The referral signs up for a new Ankr account using the referral code or link provided by the referrer.</li><li>The referrer will receive rewards in the form of POINTS, which can be used to top-up their Pay-As-You-Go (PAYG) balance.</li><li>The referral will receive a welcome bonus for their first deposit.</li></ul>',
    },
    firstDeposit: {
      title: 'First deposit',
      description: `<ul><li>A "First Deposit" is defined as any transaction made by the referral that utilizes USD, USDt/USDc or Ankr's tokens, excluding voucher credit and DEAL subscription.</li></ul>`,
    },
    rewards: {
      title: 'Referral rewards',
      description:
        '<ul><li>For Referrer: The referrer will receive POINTS on REFERRER BALANCE equal to 20% of all credits spent by the referral. Voucher credit spending by the referral will not be rewarded. Rewards will be calculated once per day. There is an upper limit of $100 in rewards that a referrer can receive per referral. Once the total rewards value reaches this limit, no new rewards will be given. The referrer can use the accumulated rewards to top-up their own PAYG BALANCE. The exchange rate for POINTS to API credits is 1:1.</li><li>For Referral: The referral will receive a welcome bonus of 20% of their first deposit in the form of vouchers on PAYG BALANCE. These vouchers will have an expiration period of 30 days.</li></ul>',
    },
    limitations: {
      title: 'Restrictions and Limitations',
      description:
        '<ul><li>Referrals must be new users (who have never registered for an Ankr account before OR have a FREEMIUM account).</li><li>Self-referrals are not allowed and will not be rewarded.</li><li>Referral rewards cannot be transferred, sold, or exchanged for cash.</li><li>Ankr reserves the right to disqualify any user from the Referral Program if there is suspicion of abuse, fraud, or violation of these terms.</li></ul>',
    },
    changes: {
      title: 'Changes to the Referral Program',
      description:
        '<ul><li>Ankr may modify, suspend, or terminate the Referral Program at any time without notice. Any changes will be posted on our website and will apply to all referrals and rewards earned after the date of such changes.</li></ul>',
    },
    expiration: {
      title: 'Expiration of Referral Rewards',
      description:
        '<ul><li>For Referrer: no time limits to use POINTS; no time limit to use API CREDITS after top up PAYG BALANCE.</li><li>For Referral: vouchers will have an expiration period of 30 days.</li></ul>',
    },
  },
};
