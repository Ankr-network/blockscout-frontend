export enum SignupDialogState {
  DEFAULT = 'DEFAULT',
  WEB3 = 'WEB3',
  WEB2 = 'WEB2',
}

export enum SignupFormField {
  state = 'state',
  hasTerms = 'hasTerms',
  hasMarketing = 'hasMarketing',
}

export interface SignupFormValues {
  [SignupFormField.state]?: SignupDialogState;
  [SignupFormField.hasTerms]?: boolean;
  [SignupFormField.hasMarketing]?: boolean;
}

export interface SignupFormErrors {
  [SignupFormField.hasTerms]?: string;
}

export interface SignupDialogDefaultContentProps {
  onGoogleButtonClick: () => void;
  setWeb3State: () => void;
}
