import { send } from "../utils/fetch";
import { Notifier } from "./notifier"

const notifier = new Notifier()

export function formsHandler (){
	function beforeSend (form) {
		const submitBtn = form.querySelector('.form__submit'),
			  fields = form.querySelectorAll('[name]');

		fields.forEach((field) => {
			field.setAttribute('disabled', true)
		})

		if(submitBtn) submitBtn.setAttribute('disabled', true)

		form.classList.add('waiting')
	}

	function displayMessage(status, message) {
		notifier.clear()

		switch (status) {
			case 'success':
				notifier.success(message)
				break
			case 'error':
				notifier.error(message)
				break
			default:
				notifier.error("Unknown error")
		}

	}

	function afterSend (form) {
		const submitBtn = form.querySelector('.form__submit'),
			  fields = form.querySelectorAll('[name]');

		fields.forEach((field) => {
			field.removeAttribute('disabled')
		})

		if(submitBtn) submitBtn.removeAttribute('disabled')

		form.classList.remove('waiting')

	}

	const forms = document.querySelectorAll('.form_ajax')

	forms.forEach((currentForm) => {
		const callbacks = JSON.parse(currentForm.dataset.callbacks ? currentForm.dataset.callbacks : '{}')


		currentForm.addEventListener('submit',  (e) => {
			e.preventDefault()

			let data = new FormData(currentForm)

			notifier.clear().info('Loading...')


			beforeSend(currentForm)

			const options = {
				method: currentForm.getAttribute('method'),
				body: data
			}

			send(currentForm.getAttribute('action'), options).then(response => {
				switch (response.status) {
					case 'success':
						displayMessage(response.status, response.message)
						if(callbacks.success) {
							const callbackNames = Array.isArray(callbacks.success) ? callbacks.success : [callbacks.success]

							for (let name of callbackNames) {
								try {
									window[name].call(this, currentForm, response);
								} catch(e) {
									console.error(`Unknown ${name} function`)
								}
							}
						}
						currentForm.classList.add('success')
						break
					case 'error':
						displayMessage(response.status, response.message)
						if(callbacks.errors) {
							const callbackNames = Array.isArray(callbacks.errors) ? callbacks.errors : [callbacks.errors]

							for (let name of callbackNames) {
								try {
									window[name].call(this, currentForm, response);
								} catch(e) {
									console.error(`Unknown ${name} function`)
								}
							}
						}
						break
					default:
						displayMessage('error')
				}

				afterSend(currentForm)
			}).catch(err => {
				displayMessage('error')
				afterSend(currentForm)
			})
		})
	})
}