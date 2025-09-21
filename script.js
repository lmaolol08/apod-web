// script.js
// Frontend code for APOD web app, using Netlify function proxy

const titleEl = document.getElementById("title");
const imageEl = document.getElementById("apod-image");
const explanationEl = document.getElementById("explanation");
const datePicker = document.getElementById("datePicker");
const loadBtn = document.getElementById("loadBtn");

function resetFade() {
  titleEl.classList.remove("show");
  explanationEl.classList.remove("show");
  imageEl.classList.remove("show");
}

async function getApod(date) {
  let url = "/.netlify/functions/apod";
  if (date) url += `?date=${date}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      titleEl.textContent = "Error: " + (data.error.message || data.error);
      imageEl.style.display = "none";
      explanationEl.textContent = "";
      return;
    }

    // Reset fade classes before showing new content
    resetFade();

    // Populate title + explanation
    titleEl.textContent = data.title || "";
    explanationEl.textContent = data.explanation || "";

    // Trigger fade-in
    setTimeout(() => {
      titleEl.classList.add("show");
      explanationEl.classList.add("show");
    }, 50);

    if (data.media_type === "image") {
      imageEl.src = data.url;
      imageEl.style.display = "block";
      imageEl.onload = () => {
        imageEl.classList.add("show");
      };
    } else {
      imageEl.style.display = "none";
      explanationEl.innerHTML =
        (data.explanation || "") +
        `<br><a href="${data.url}" target="_blank">View media</a>`;
    }
  } catch (err) {
    titleEl.textContent = "Network error";
    explanationEl.textContent = err.message;
  }
}

// Load APOD for chosen date
loadBtn.addEventListener("click", () => {
  const d = datePicker.value;
  getApod(d);
});

// Load today’s APOD on page load
getApod();
