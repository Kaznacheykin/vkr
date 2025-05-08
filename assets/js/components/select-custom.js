import { closeDropdown } from './dropdown'

export function handleSelects (element) {
	if(element.closest('.select-custom__option')) {
		const select = element.closest('.select-custom'),
			  control = select.querySelector('.select-custom__control'),
			  option = element.closest('.select-custom__option'),
			  selected = select.querySelector('.select-custom__option-selected'),
			  isAutoSubmit = select.classList.contains('select-custom_autosubmit')

		if(control) control.value = option.dataset.value;

		closeDropdown(select)

		if(selected && !isAutoSubmit) selected.classList.remove('select-custom__option-selected')

		if(!isAutoSubmit) option.classList.add('select-custom__option-selected')

		if(isAutoSubmit) {
			const form = select.closest('form')

			if(form) form.dispatchEvent(new Event("submit", { cancelable: true }))
		}
	}
}