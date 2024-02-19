export const TEAMS_ONBOARDING_FLAG = 'isTeamsOnboardingCompleted';

export const isTeamsOnboardingPassed = () => {
  return Boolean(localStorage.getItem(TEAMS_ONBOARDING_FLAG));
};

export const setTeamsOnboardingCompleted = () => {
  localStorage.setItem(TEAMS_ONBOARDING_FLAG, 'true');
};
