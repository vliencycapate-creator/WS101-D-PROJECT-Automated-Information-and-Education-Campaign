/* ==================================
   FEEDBACK.JS – Website + Flyer Feedback
================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------
       Faculty Feedback List
    -------------------------- */
    const feedbackList = document.getElementById("feedbackList");

    if (feedbackList) {
        feedbackList.innerHTML = `
            <div class="feedback-card">
                <strong>John Doe:</strong>
                <p>Great flyer layout!</p>
            </div>
            <div class="feedback-card">
                <strong>Ana Smith:</strong>
                <p>Very informative.</p>
            </div>
        `;
    }

    /* -------------------------
       Admin Feedback Tables
    -------------------------- */
    const websiteFeedbackBody = document.getElementById("websiteFeedbackBody");
    const flyerFeedbackBody = document.getElementById("flyerFeedbackBody");

    if (websiteFeedbackBody) {
        websiteFeedbackBody.innerHTML = `
            <tr><td>Maria Cruz</td><td>Website is smooth!</td></tr>
            <tr><td>Kyle Reyes</td><td>Easy to use.</td></tr>
        `;
    }

    if (flyerFeedbackBody) {
        flyerFeedbackBody.innerHTML = `
            <tr><td>Event A</td><td>Nice visuals!</td></tr>
            <tr><td>Event B</td><td>Clear details.</td></tr>
        `;
    }

});