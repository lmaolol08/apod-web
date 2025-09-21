const API_KEY = "CBxMZxICEdfJ3jf8XhsZLkQErco9cposHo2gc70c"; 
const titleEl = document.getElementById("title");
const imageEl = document.getElementById("apod-image");
const explanationEl = document.getElementById("explanation");
const datePicker = document.getElementById("datePicker");
const loadBtn = document.getElementById("loadBtn");

async function getApod(date) {
  let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
  if (date) url += `&date=${date}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.error) {
      titleEl.textContent = "Error: " + (data.error.message || "API error");
      imageEl.style.display = "none";
      explanationEl.textContent = "";
      return;
    }

    titleEl.textContent = data.title || "";
    explanationEl.textContent = data.explanation || "";

    if (data.media_type === "image") {
      imageEl.src = data.url;
      imageEl.style.display = "block";
    } else {
      imageEl.style.display = "none";
      // for videos (YouTube etc.)
      explanationEl.innerHTML += `<br><a href="${data.url}" target="_blank">View video</a>`;
    }
  } catch (err) {
    titleEl.textContent = "Network error";
    explanationEl.textContent = err.message;
  }
}

loadBtn.addEventListener("click", () => {
  const d = datePicker.value;
  getApod(d);
});

// load today's APOD on page load
getApod();
