export function handleHiddenLinks(element) {
	if(!element.closest('.link_hidden')) return

	const linkEl = element.closest('.link_hidden'),
		  target = linkEl.dataset.target || '_self',
		  url = linkEl.dataset.link;

	if(!url) return;

	window.open(url, target);
}