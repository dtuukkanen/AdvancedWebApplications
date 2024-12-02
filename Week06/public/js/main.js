document
  .getElementById("offerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    await addOffer();
    await getOffers();
  });

document.addEventListener("DOMContentLoaded", async function () {
  await getOffers();
});

async function addOffer() {
  try {
    const formData = new FormData();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const imageFile = document.getElementById("image").files[0];

    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Success:", data);
  } catch (error) {
    console.error(error);
  }
}

async function getOffers() {
  try {
    const response = await fetch("/offers");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    await displayOffers(data);
    console.log("Success:", data);
  } catch (error) {
    console.error(error);
  }
}

const displayOffers = async (offers) => {
  const offersContainer = document.getElementById("offersContainer");
  offersContainer.innerHTML = "";
  offers.forEach((offer) => {
    const offerDiv = document.createElement("div");
    const cardDiv = document.createElement("div");
    const innerDiv = document.createElement("div");
    const imageDiv = document.createElement("div");
    const contentDiv = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("span");
    const description = document.createElement("p");
    const price = document.createElement("p");

    offerDiv.className = "offerDiv col s12 m6 l4";
    cardDiv.className = "card hoverable";
    imageDiv.className = "card-image";
    contentDiv.className = "card-content";
    image.className = "responsive-img";
    image.src = "http://localhost:3000" + offer.imagePath;
    title.textContent = offer.title;
    title.className = "card-title";
    description.textContent = offer.description;
    price.textContent = offer.price;

    imageDiv.appendChild(image);
    imageDiv.appendChild(title);
    cardDiv.appendChild(imageDiv);
    contentDiv.appendChild(description);
    contentDiv.appendChild(price);
    cardDiv.appendChild(contentDiv);
    offerDiv.appendChild(cardDiv);
    offersContainer.appendChild(offerDiv);
  });
};
