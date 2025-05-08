export default function insertCss(href) {
	const style = document.createElement('link');
	style.href = href;
	style.rel = 'stylesheet';
	document.head.appendChild(style);
}