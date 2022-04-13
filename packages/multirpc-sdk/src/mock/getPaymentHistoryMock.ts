import {
  IPaymentHistoryEntity,
  IPaymentHistoryReponse,
  IPaymentHistoryRequest,
} from 'multirpc-sdk';
import { faker } from '@faker-js/faker';
import { createArray } from './utils';
import orderBy from 'lodash.orderby';

const totalPages = 5;
const defaultPageSize = 10;
const directionVariants = ['outbound', 'income'];

const createRow = () => {
  const direction = faker.random.arrayElement(directionVariants);

  return {
    id: faker.datatype.uuid(),
    date: faker.date.past().toISOString(),
    direction,
    amountUsd: faker.finance.amount(),
    amountAnkr: faker.finance.amount(),
    paymentType: direction === 'outbound' ? 'Daily charge' : 'Top Up',
  } as IPaymentHistoryEntity;
};
export const getPaymentHistoryMock = (
  params: IPaymentHistoryRequest,
): IPaymentHistoryReponse => {
  let data = createArray(params.pageSize || defaultPageSize, createRow);

  data = orderBy(data, params.orderBy, params.order);

  return {
    page: params.page,
    totalPages,
    data,
  };
};
