export async function removeHelp(browser) {
  await browser.execute("document.getElementById('jsd-widget')?.remove()");
}
