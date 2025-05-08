import { isRtl } from "../utils/rtl";
export function closeDropdown (dropdown) {
	dropdown.classList.remove('dropdown_visible')
	dropdown.classList.remove('dropdown_open')
}

export function closeAllDropdowns () {
	const openedDropdowns = document.querySelectorAll('.dropdown_open')

	openedDropdowns.forEach((dropdown)=>{
		closeDropdown(dropdown)
	})
}

export function openDropdown (button) {
	const parent = button.closest('.dropdown'),
		content   = parent.querySelector('.dropdown__content'),
		isRight = parent.classList.contains('dropdown_right'),
		isLeft = parent.classList.contains('dropdown_left'),
		isTop = parent.classList.contains('dropdown_top'),
		isBottom = parent.classList.contains('dropdown_bottom')

	parent.classList.add('dropdown_open')

	//Align dropdown

	if(isTop || isBottom) {
		content.style[isBottom ? 'bottom' : 'top'] = `${parent.clientHeight}px`
		content.style[isBottom ? 'top' : 'bottom'] = `auto`
	} else {
		// Default
		content.style.top = `${parent.clientHeight}px`
		content.style.bottom = 'auto'
	}

	if(isRight || isLeft) {
		content.style[isRight || isRtl() ? 'right' : 'left'] = `0px`
		content.style[isRight || isRtl() ? 'left' : 'right'] = `auto`
	} else {
		// Default
		content.style.left = `${-(content.clientWidth - parent.clientWidth) / 2 }px`
		content.style.right = 'auto'
	}

	const menuCoordinates = content.getBoundingClientRect();

	//Auto check position dropdown

	if(menuCoordinates.top < 0) {
		content.style.top = '100%'
		content.style.bottom = 'auto'
	}

	if(menuCoordinates.bottom > window.screen.height) {
		content.style.bottom = '100%'
		content.style.top = 'auto'
	}

	if(menuCoordinates.left < 0) {
		content.style.left = '0px'
		content.style.right = 'auto'
	}

	if(menuCoordinates.right > window.screen.width) {
		content.style.right = '0px'
		content.style.left = 'auto'
	}

	parent.classList.add('dropdown_visible')
}

export function handleDropdowns (element) {
	if(element.closest('.dropdown__button')) {
		if(!element.closest('.dropdown_open') ) closeAllDropdowns()

		openDropdown(element)

		return
	}


	if(element.closest('.dropdown__content')) return

	closeAllDropdowns()
}