import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';

import { useIsSMDown } from 'uiKit/Theme/useTheme';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { useOnMount } from 'modules/common/hooks/useOnMount';

export const JSD_WIDGET_ID = 'jsd-widget';

const JSD_WIDGET_MOBILE_CLASS_NAME = 'jsd-widget-mobile';

const JSD_WIDGET_PROJECT_CLASS_NAME = 'jsd-widget-project';

export const JSD_HELP_BUTTON_ID = 'help-button';

const observeWidgetOpeningStyles = () => {
  const target = document.getElementById(JSD_WIDGET_ID);

  const observer = new MutationObserver(mutations => {
    mutations.forEach(() => {
      if (!target) return;

      if (target.style.height === '100%') {
        target.classList.remove(JSD_WIDGET_MOBILE_CLASS_NAME);
      } else {
        target.classList.add(JSD_WIDGET_MOBILE_CLASS_NAME);
      }
    });
  });

  if (target) {
    observer.observe(target, { attributes: true, attributeFilter: ['style'] });
  }

  return observer;
};

const useNewProjectPageStyles = () => {
  const {
    listen,
    location: { pathname: initialPathName },
  } = useHistory();
  const [isNewProject, setIsNewProject] = useState<boolean>(false);

  useOnMount(() => {
    setIsNewProject(Boolean(initialPathName));
  });

  useEffect(() => {
    const unlisten = listen(({ pathname }) => {
      setIsNewProject(pathname === ProjectsRoutesConfig.newProject.path);
    });

    return unlisten;
  }, [listen, initialPathName]);

  useEffect(() => {
    setTimeout(() => {
      const target = document.getElementById(JSD_WIDGET_ID);

      if (!target) return;

      if (isNewProject) {
        target.classList.add(JSD_WIDGET_PROJECT_CLASS_NAME);
      } else {
        target.classList.remove(JSD_WIDGET_PROJECT_CLASS_NAME);
      }
    }, 100);
  }, [isNewProject]);
};

const useStyleObserver = (isMobile: boolean) => {
  const observer = useRef<MutationObserver>();

  useEffect(() => {
    setTimeout(() => {
      const target = document.getElementById(JSD_WIDGET_ID);

      if (observer.current) {
        observer.current.disconnect();
      }

      if (target && isMobile) {
        observer.current = observeWidgetOpeningStyles();
      }
    }, 100);
  }, [isMobile]);
};

export const useJSDWidget = () => {
  const isMobile = useIsSMDown();

  useNewProjectPageStyles();
  useStyleObserver(isMobile);
};
