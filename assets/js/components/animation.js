export default function (block) {
	const duration = block.dataset.duration || '1',
		animationName = block.dataset.animationName || 'fadeInDown',
		multiplier = window.screen.width > 765 ? 3 : 1;

	block.style.setProperty('--animate-duration', `${parseFloat(duration) * multiplier}s`);
	block.classList.add('animate__animated', `animate__${animationName}`);
}