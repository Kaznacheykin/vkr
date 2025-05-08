export function toggleAccordion (accordion) {
	accordion.classList.toggle('accordion_open')
}


export function handleAccordions (event, element) {
	if(!element.closest('.accordion')) return

	const accordion = element.closest('.accordion');

	if(accordion.dataset.clickOnArrow) {
		if(element.closest('.accordion__arrow')) {
			event.preventDefault()
			toggleAccordion(accordion)
		}
	} else {
		toggleAccordion(accordion)
	}

}