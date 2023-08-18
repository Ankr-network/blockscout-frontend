export enum SignupDialogState {
  DEFAULT = 'DEFAULT',
  WEB3 = 'WEB3',
}

export enum SignupFormField {
  loginType = 'loginType',
  hasTerms = 'hasTerms',
  hasMarketing = 'hasMarketing',
}

export enum OauthLoginType {
  Google = 'google',
  Github = 'github',
}

export type SignupFormLoginType =
  | OauthLoginType.Google
  | OauthLoginType.Github
  | SignupDialogState.WEB3;

export interface SignupFormValues {
  [SignupFormField.loginType]?: SignupFormLoginType;
  [SignupFormField.hasTerms]?: boolean;
  [SignupFormField.hasMarketing]?: boolean;
}

export interface SignupFormErrors {
  [SignupFormField.hasTerms]?: string;
}

export interface SignupDialogDefaultContentProps {
  onGoogleButtonClick: () => void;
  onGithubButtonClick: () => void;
  setWeb3State: () => void;
}
