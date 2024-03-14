// Simulate seek bar animation
const progressBar = document.getElementById("progress-bar");
progressBar.style.width = progressBar.value + "%";

function updateProgressBar() {
  const newValue = Math.random() * 100;
  progressBar.style.width = newValue + "%";
}

setInterval(updateProgressBar, 3000);

// Button animation
const buttons = document.querySelectorAll(".card__btn");

buttons.forEach((button) => {
  button.addEventListener("mouseenter", () => {
    button.style.transform = "scale(1.1)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "scale(1)";
  });
});

// Function to fetch song lyrics from Genius API
async function fetchSongLyrics(songTitle, artistName) {
  const accessToken = "YOUR_ACCESS_TOKEN"; // Replace 'YOUR_ACCESS_TOKEN' with your actual access token
  const apiUrl = `https://api.genius.com/search?q=${encodeURIComponent(
    songTitle
  )}%20${encodeURIComponent(artistName)}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch song lyrics");
    }

    const data = await response.json();
    const songUrl = data.response.hits[0].result.url;
    return songUrl;
  } catch (error) {
    console.error("Error fetching song lyrics:", error.message);
  }
}

// Function to open the Genius lyrics page in a new tab
async function openGeniusLyrics(songTitle, artistName) {
  const songUrl = await fetchSongLyrics(songTitle, artistName);
  if (songUrl) {
    window.open(songUrl, "_blank");
  } else {
    console.error("Song lyrics not found");
  }
}

// Event listener for clicking on the song subtitle
const subtitle = document.querySelector(".card__subtitle");
subtitle.addEventListener("click", () => {
  const songTitle = document.querySelector(".card__title").textContent;
  const artistName = subtitle.textContent.split(",")[1].trim(); // Assuming artist name comes after the comma
  openGeniusLyrics(songTitle, artistName);
});
