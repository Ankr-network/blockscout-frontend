export interface InitTwoFAResponse {
  passcode: string;
  qr_code: string;
  issuer: string;
  account: string;
}

export interface ConfirmTwoFARequestParams {
  totp: string;
}

export type ConfirmTwoFAResponse = Record<string, unknown>;

export type DisableTwoFAResponse = Record<string, unknown>;

export interface TwoFAStatusResponse {
  '2FAs': TOTP[];
}

interface TOTP {
  type: 'TOTP';
  status: TwoFAStatus;
}

export enum TwoFAStatus {
  None = 'none',
  Pending = 'pending',
  Enabled = 'enabled',
}

