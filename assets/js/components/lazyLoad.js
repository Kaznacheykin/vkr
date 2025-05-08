export default function (imageBlock) {
	const image = imageBlock;
	image.src = image.dataset.src;
	if(image.dataset.srcset) image.srcset = image.dataset.srcset;
	image.onload = function () {
		image.classList.remove("lazy");
	}
}