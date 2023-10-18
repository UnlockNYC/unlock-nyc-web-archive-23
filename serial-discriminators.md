---
layout: layout.liquid
pageTitle: Report 2023
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

**Serial Discriminators:** \
Who is locking New Yorkers with vouchers out of the housing market?<br>
October, 2023

<a id="report-img-link" href="https://cdn.glitch.global/b185c63a-8d27-412b-b4cb-047ca0c8de79/SerialDiscrimination-Report-2023-Digital.pdf?v=1697488588488" style="border-bottom: 0;">
<img class="report-sample" src="https://cdn.glitch.global/b185c63a-8d27-412b-b4cb-047ca0c8de79/serial-discriminators-report-page.png?v=1697487990851">
</a>
<br>

<p>
  <a href="https://cdn.glitch.global/b185c63a-8d27-412b-b4cb-047ca0c8de79/SerialDiscrimination-Report-2023-Digital.pdf?v=1697488588488" class="report">Download Report</a>
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
  $("a.report, a#report-image-link").click(function () {
    // press inquiry
    instance.action("af36868f-02bd-458e-b192-d8bcc8ee7e22", {
      key: "Download",
      value: 1,
    });
  });
</script>
