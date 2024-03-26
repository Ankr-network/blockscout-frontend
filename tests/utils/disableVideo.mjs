const IS_REMOVE_MODE = false;

export async function disableVideo(browser) {
  await browser.execute(
    IS_REMOVE_MODE
      ? 'Array.from(document.getElementsByTagName("video")).forEach((video) => {video.remove();})'
      : 'Array.from(document.getElementsByTagName("video")).forEach((video) => {video.pause();video.currentTime=0;})',
  );
}
