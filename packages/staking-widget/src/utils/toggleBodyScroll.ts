import { getScrollbarSize } from './getScrollbarSize';

export const toggleBodyScroll = (shouldBeFixed: boolean) => {
  const body = document.body;

  if (shouldBeFixed) {
    const scrollBarSize = getScrollbarSize();
    body.style.marginRight = scrollBarSize + 'px';
    body.style.overflow = 'hidden';
  } else {
    body.style.removeProperty('overflow');
    body.style.removeProperty('margin-right');
  }
};
