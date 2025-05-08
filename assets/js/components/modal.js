function updateBodyLocked(isClosing) {
	if(isClosing) {
		if(document.querySelector('.modal_open')) return

		const scrollTop = document.body.style.top
		document.body.style.position = '';
		document.body.style.top = '';
		window.scrollTo(0, parseInt(scrollTop || '0') * -1);
	} else {
		if(document.querySelectorAll('.modal_open').length > 1) return

		const scrollTop = (document.documentElement || document.body.parentNode || document.body).scrollTop;
		document.body.style.position = 'fixed';
		document.body.style.top = `-${scrollTop}px`;
	}
}

export function handleModal(element) {
	if(element.closest('.button_modal')) {
		const modalSelector = element.closest('.button_modal').dataset.modal;

		if(!modalSelector) return

		const modal = document.querySelector(modalSelector),
			isClosing = modal.classList.contains('modal_open'),
			actionName = isClosing ? 'remove' : 'add'

		element.closest('.button_modal').classList[actionName]('open')

		modal.classList[actionName]('modal_open')
		modal.classList[actionName]('modal_visible')

		updateBodyLocked(isClosing)
	}

	if(element.closest('.modal__close') || (element.closest('.modal__overlay'))) {
		const modal = element.closest('.modal'),
			  btn = document.querySelector(`.button_modal[data-modal="#${modal.getAttribute('id')}"]`)

		modal.classList.remove('modal_visible')
		modal.classList.remove('modal_open')
		btn.classList.remove('open')

		updateBodyLocked(true)
	}
}