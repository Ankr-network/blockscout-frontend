export interface DomainsFormProps {
  data: string[];
  onSubmit: (domains: string[]) => void;
}

export interface DomainsFormContainerProps
  extends Omit<DomainsFormProps, 'onSubmit'> {
  chainId: string;
}

export enum DomainsFormFields {
  domain = 'domain',
  domains = 'domains',
}

export interface DomainsFormData {
  domain?: string;
  domains: string[];
}
