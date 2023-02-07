import { AdminRoles, ApiAdminRole } from '../types';

export const getRoleByResponse: Record<ApiAdminRole, AdminRoles> = {
  'node admin (worker)': AdminRoles.USER_ROLE_NODE_ADMIN,
  'node reader (worker)': AdminRoles.USER_ROLE_NODE_READER,
  'user admin (worker)': AdminRoles.USER_ROLE_USER_ADMIN,
  'user reader (worker)': AdminRoles.USER_ROLE_USER_READER,
  'accounting data reader (back-end)':
    AdminRoles.USER_ROLE_ACCOUNTING_DATA_READER,
  'voucher manager': AdminRoles.USER_ROLE_VOUCHER_MANAGER,
  'test drive token creator': AdminRoles.USER_ROLE_TEST_DRIVE_TOKEN_CREATOR,
  'user stats viewer': AdminRoles.USER_ROLE_USER_STATS_VIEWER,
  'user profile reader': AdminRoles.USER_ROLE_USER_PROFILE_READER,
  'user notification sender': AdminRoles.USER_ROLE_NOTIFICATION_SENDER,
  'payments admin': AdminRoles.USER_ROLE_PAYMENTS_ADMIN,
  'user profile admin': AdminRoles.USER_ROLE_USER_PROFILE_ADMIN,
  'product manager': AdminRoles.USER_ROLE_PRODUCT_MANAGER,
};
