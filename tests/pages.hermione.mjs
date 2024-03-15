import { disableVideo } from './utils/disableVideo.mjs';
import { getPagesList } from './utils/getPagesList.mjs';
import { removeFeedbackButton } from './utils/removeFeedbackButton.mjs';
import { removeHelp } from './utils/removeHelp.mjs';

describe('Pages', () => {
  const pages = getPagesList();
  for (const page of pages) {
    it(`Page ${page.url}`, async ({ browser }) => {
      await browser.url(page.url);
      await disableVideo(browser);
      await removeFeedbackButton(browser);
      await removeHelp(browser);
      if (page.width && page.height) {
        await browser.setWindowSize(page.width, page.height);
      }

      await browser.assertView(`open`, '#root');
    });
  }
});
