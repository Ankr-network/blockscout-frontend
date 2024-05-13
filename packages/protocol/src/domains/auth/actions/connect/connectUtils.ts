import { MultiService } from 'modules/api/MultiService';

export const disconnectService = () => {
  MultiService.removeServices();
};
