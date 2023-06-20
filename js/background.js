const images = [
   "2.jpg",
]

const chosenImages = images[Math.floor(Math.random()*images.length)];

const bgImage = document.createElement("img");
bgImage.src = `img/${chosenImages}`;

document.body.appendChild(bgImage);
bgImage.id = 'bgImage';