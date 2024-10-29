const container = document.querySelector('.container');

const generateWikiItem = async () => {
    // Get random dog image
    const dogImage = await fetchDogImage();
    console.log(dogImage);

    const dogSummary = await fetchWikiData();
    console.log(dogSummary);

    // Wiki item
    const wikiItem = document.createElement('div');
    wikiItem.className = 'wiki-item';

    // Wiki header
    const wikiHeader = document.createElement('h1');
    wikiHeader.className = 'wiki-header';
    wikiHeader.textContent = 'Great Dane';

    // Wiki content
    const wikiContent = document.createElement('div');
    wikiContent.className = 'wiki-content';

    // Wiki text
    const wikiText = document.createElement('p');
    wikiText.className = 'wiki-text';
    wikiText.textContent = dogSummary;

    // Image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'img-container';
    
    // Wiki image
    const wikiImage = document.createElement('img');
    wikiImage.className = 'wiki-img';
    wikiImage.src = dogImage;

    // Append elements
    imageContainer.appendChild(wikiImage); // Image container
    wikiContent.appendChild(wikiText); // Wiki content
    wikiContent.appendChild(imageContainer); // Wiki content
    wikiItem.appendChild(wikiHeader); // Wiki item
    wikiItem.appendChild(wikiContent); // Wiki item
    return wikiItem;
}

const fetchDogImage = async () => {
    const response = await fetch('https://dog.ceo/api/breed/dane/images/random');
    const data = await response.json();
    console.log(data);
    return data.message;
}

const fetchWikiData = async () => {
    const response = await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/Great_Dane');
    const data = await response.json();
    console.log(data);
    return data.extract;
}

const appendWikiItems = async () => {
    for (let i = 0; i < 10; i++) {
        wikiItem = await generateWikiItem();
        console.log(wikiItem);
        container.appendChild(wikiItem);
    }
}

appendWikiItems();