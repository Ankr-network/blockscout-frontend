import { Locale } from 'modules/i18n';

export const faqSectionTranslation = {
  [Locale.en]: {
    title: 'FAQ',
    definition: {
      question: `What is Ankr's Referral Program?`,
      answer: `Ankr's Referral Program allows existing users (referrers) to earn rewards by inviting new customers (referrals) to join Ankr. Both referrers and referrals receive benefits when the referral signs up using a referral code or link.`,
    },
    eligibility: {
      question: 'Who is eligible to participate in the Referral Program?',
      answer:
        '<ul><li><b>Referrer</b>: All registered Ankr users are eligible to refer others.</li><li><b>Referral</b>: Must be a new user with no previous account or a Freemium account (must not have had a Premium account or used any other referral code before)</li></ul>',
    },
    rewardsEarning: {
      question: 'How can I earn referral rewards?',
      answer:
        'To earn rewards, the referrer sends an invite, and the referral must sign up for a new Ankr account using the referral code or link. The referrer earns POINTS, which can be used to top up their Pay-As-You-Go (PAYG) balance.',
    },
    rewardsDefinition: {
      question: 'What are the rewards for referrers and referrals?',
      answer:
        '<ul><li><b>For Referrer</b>: Earns POINTS equal to 20% of all credits spent by the referral, with a maximum of $100 in rewards per referral.</li><li><b>For Referral</b>: Receives a welcome bonus of 20% of their first deposit in the form of vouchers, valid for 30 days.</li></ul>',
    },
    firstDeposit: {
      question: 'What qualifies as a "First Deposit"?',
      answer:
        'A First Deposit includes any transaction made by the referral using USD, USDt/USDc, or Ankr tokens, excluding voucher credits and DEAL subscriptions.',
    },
    limitation: {
      question: 'Are there any restrictions or limitations?',
      answer:
        '<ul><li>Referrals must be new users (no prior Ankr accounts or only Freemium accounts).</li><li>Self-referrals are not allowed.</li><li>Referral rewards cannot be transferred, sold, or exchanged for cash.</li><li>Ankr may disqualify users for abuse, fraud, or violations of the terms.</li></ul>',
    },
    usage: {
      question:
        'How do I use the POINTS and vouchers earned through the program?',
      answer: `<ul><li><b>For Referrer</b>: POINTS can be used to top up the referrer's PAYG balance, with an exchange rate of 1 POINT to 1 API credit.</li><li><b>For Referral</b>: Vouchers earned as a welcome bonus are automatically applied to the PAYG balance and are valid for 30 days.</li></ul>`,
    },
    expiration: {
      question: 'Do referral rewards have an expiration date?',
      answer: `<ul><li><b>For Referrer</b>: POINTS and API credits have no expiration date once added to the PAYG balance.</li><li><b>For Referral</b>: Vouchers awarded as a welcome bonus expire 30 days after issuance.</li></ul>`,
    },
  },
};
