import { useCallback, useState } from 'react';

import { t } from 'modules/i18n/utils/intl';
import { useQueryParams } from 'modules/router/hooks/useQueryParams';

export enum EStep {
  SendingProgress,
  Receive,
  ReciveProgress,
  Finish,
}

interface IUseSteps {
  stepTitle: string;
  stepsCount: number;
  stepText: string;
  currentStep: EStep;
  setStep: (newStep: number) => void;
}

export function useSteps(): IUseSteps {
  const [currentStep, setCurrentStep] = useState(EStep.SendingProgress);
  const query = useQueryParams();
  const toChainId = query.get('chainIdTo');

  const steps = {
    [EStep.SendingProgress]: {
      title: t('bridge.tx.titles.send-in-progress'),
      descr: t('bridge.tx.description.progress', {
        token: query.get('token') ?? '',
        network: t(`chain.${toChainId}`),
      }),
    },
    [EStep.Receive]: {
      title: t('bridge.tx.titles.receive-assets'),
      descr: t('bridge.tx.description.connect-wallet'),
    },

    [EStep.ReciveProgress]: {
      title: t('bridge.tx.titles.receiving-in-process'),
      descr: t('bridge.tx.description.take-moment'),
    },

    [EStep.Finish]: {
      title: t('bridge.tx.titles.successeful'),
      descr: '',
    },
  };

  const setStep = useCallback((newStep: EStep) => {
    setCurrentStep(newStep);
  }, []);

  return {
    stepTitle: steps[currentStep].title,
    stepsCount: Object.keys(steps).length - 1,
    stepText: steps[currentStep].descr,
    currentStep,
    setStep,
  };
}
