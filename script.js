// script.js
// Frontend code for APOD web app, using Netlify function proxy

const dateInput = document.getElementById("date");
const loadBtn = document.getElementById("load-btn");
const imageEl = document.getElementById("apod-image");
const videoEl = document.getElementById("apod-video");
const titleEl = document.getElementById("title");
const explanationEl = document.getElementById("explanation");

// Load APOD for selected date
async function getApod(date) {
  try {
    const res = await fetch(`${BASE_URL}?api_key=${API_KEY}&date=${date}`);
    const data = await res.json();

    // Reset animations
    imageEl.classList.remove("animate");
    explanationEl.classList.remove("animate");
    titleEl.classList.remove("animate");

    // Apply data
    titleEl.textContent = data.title || "";

    if (data.media_type === "image") {
      imageEl.src = data.url;
      imageEl.style.display = "block";
      videoEl.style.display = "none";
    } else if (data.media_type === "video") {
      videoEl.src = data.url;
      videoEl.style.display = "block";
      imageEl.style.display = "none";
    }

    explanationEl.textContent = data.explanation || "";

    // Re-trigger animations after short delay
    setTimeout(() => {
      imageEl.classList.add("animate");
      explanationEl.classList.add("animate");
      titleEl.classList.add("animate");
    }, 100);

  } catch (error) {
    console.error("Error fetching APOD:", error);
  }
}

// Default: load today’s APOD
document.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  dateInput.value = today;
  getApod(today);
});

// Load APOD on button click
loadBtn.addEventListener("click", () => {
  const date = dateInput.value;
  if (date) getApod(date);
});