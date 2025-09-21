/* Footer year + last modified */
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

/* --- Weather / Wind Chill --- */
const tempF = Number(document.getElementById("temp").textContent);   // °F
const windMph = Number(document.getElementById("wind").textContent); // mph

/* windchill function */
function calculateWindChill(t, v) {
  return Math.round(10 * (35.74 + 0.6215 * t - 35.75 * Math.pow(v, 0.16) + 0.4275 * t * Math.pow(v, 0.16))) / 10;
}

/* Only compute when valid per standard guidance */
const chillEl = document.getElementById("windchill");
if (tempF <= 50 && windMph > 3) {
  chillEl.textContent = `${calculateWindChill(tempF, windMph)} °F`;
} else {
  chillEl.textContent = "N/A";
}


