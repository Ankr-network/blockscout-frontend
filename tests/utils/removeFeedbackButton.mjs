export async function removeFeedbackButton(browser) {
  await browser.execute(
    "document.getElementsByClassName('_hj_feedback_container')[0]?.remove()",
  );
}
