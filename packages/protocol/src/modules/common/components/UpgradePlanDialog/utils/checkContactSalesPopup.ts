import { ContentType } from '../types';

export interface CheckContactSalesPopupParams {
  contentType?: ContentType;
  defaultState?: ContentType;
}

const { CONTACT_SALES_FORM, CONTACT_SALES_SUCCESS } = ContentType;

export const checkContactSalesPopup = ({
  contentType,
  defaultState,
}: CheckContactSalesPopupParams) =>
  defaultState === CONTACT_SALES_FORM ||
  defaultState === CONTACT_SALES_SUCCESS ||
  contentType === CONTACT_SALES_FORM ||
  contentType === CONTACT_SALES_SUCCESS;
