document
  .getElementById("offerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    await addOffer();
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
