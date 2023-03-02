---
layout: layout.liquid
pageTitle: Data
---

<style>

div#data-grid {
  display: grid;
  width: 100%;
  grid-template-columns: 33% 33% auto;
  grid-column-gap: 8%;
  font-size: 17px;
  margin-top: -25px;
}
  
#data-grid div {
  margin-top: 10px;
}

#data-grid div.data-cell div.data-img {
  height: 250px;
  border: 1px dotted Black;
  cursor: pointer;
}
#data-grid div.data-cell div.data-img:hover {
  filter: brightness(0.9);
  webkit-filter: brightness(0.9);
}
#data-grid a {
  text-decoration: none;
}
  
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

<div id="data-grid">
  <div class="data-cell">
    <div class="data-img" style="background: url('https://cdn.glitch.global/b185c63a-8d27-412b-b4cb-047ca0c8de79/map-data-img.png'); background-size: cover;">
    </div>
    <div>
      <strong>Mapping SOI Discrimination in NYC</strong> (2023, interactive map - coming soon)
    </div> 
  </div>
  <div class="data-cell">
    <a href="/soi-report">
      <div class="data-img" style="background: url('https://cdn.glitch.global/b185c63a-8d27-412b-b4cb-047ca0c8de79/AnIllusionofChoice_FinalDigital-protected.jpg'); background-size: 400px; background-repeat: no-repeat; background-position: -40px 0;">
      </div>
      <div> 
        <strong>An Illusion of Choice:</strong> How Source of Income Discrimination and Voucher Policies Perpetuate Housing Inequality (report, 2022)
      </div> 
    </a>
  </div>
</div>
