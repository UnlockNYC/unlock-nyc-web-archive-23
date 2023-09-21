---
layout: layout.liquid
pageTitle: SOI Report 2022
---

<style>
  
a.report {
  font-family: "Roboto Mono", monospace;
  font-weight: 400;
  padding: 10px 20px;
  background-color: #efc02a;
  color: black;
  text-transform: uppercase;
  text-decoration: none;
}
a.report:hover {
  background-color: #56c79b !important;
}
  
img.report-sample {
  border: 1px solid Black;
  max-width: 30%;
}
  
</style>

**An Illusion of Choice:** \
How Source of Income Discrimination and Voucher Policies Perpetuate Housing Inequality

**Data Statement:** The data in this report was crowdsourced directly from New Yorkers experiencing and documenting discrimination in real-time. Given the
sensitive nature of the data, we do not plan on releasing the row-by-row data publicly. This is both to protect our users from possible retaliation,
and to follow consentful tech practices. If you'd like to request an aggregated summary of the data, please contact <a href="mailto:hello@weunlock.nyc">hello@weunlock.nyc</a>.
<br><br>
<a href="https://cdn.glitch.global/b185c63a-8d27-412b-b4cb-047ca0c8de79/AnIllusionofChoice_FinalDigital_CORRECT.pdf?v=1644419510693" style="border-bottom: 0;">
<img class="report-sample" src="https://cdn.glitch.global/b185c63a-8d27-412b-b4cb-047ca0c8de79/AnIllusionofChoice_FinalDigital-protected.jpg?v=1643857741931">
</a>
<br>

<p>
  <a href="https://cdn.glitch.global/b185c63a-8d27-412b-b4cb-047ca0c8de79/AnIllusionofChoice_FinalDigital_CORRECT.pdf?v=1644419510693" class="report">Download Report</a>
</p>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="/scripts/ackee-tracker.min.js"></script>
<script>
  // ackee analytics events
  // initialize ackeeTracker
  const instance = ackeeTracker.create(
    "https://unlocknyc-analytics.netlify.app"
  );
  instance.record("d2255a40-e04e-4d2d-aa3a-b1b5da9cf52c");
  $("a.report").click(function () {
    // press inquiry
    instance.action("e557204f-d595-4660-8554-2ca2475b4342", {
      key: "Download",
      value: 1,
    });
  });
</script>
