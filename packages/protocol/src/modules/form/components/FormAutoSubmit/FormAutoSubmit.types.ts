import { FormSpyRenderProps } from 'react-final-form';

export interface FormAutoSubmitProps {
  timeout?: number;
  onSubmit?: (values: any) => void;
  showSubmitting?: boolean;
}

export interface FormAutoSubmitFormSpyProps
  extends FormAutoSubmitProps,
    FormSpyRenderProps {}
