import { t } from '@ankr.com/common';

export const getSuccessFreezeMessage = (
  isFreeze: boolean,
  projectName: string,
) => {
  return isFreeze
    ? t('projects.freeze-dialog.success.freeze', {
        value: projectName,
      })
    : t('projects.freeze-dialog.success.unfreeze', {
        value: projectName,
      });
};
