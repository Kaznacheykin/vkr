export function insertJs(src) {
	const js = document.createElement('script');
	js.src = src;
	js.type = 'text/javascript';
	document.body.appendChild(js);
}