export function grecaptchaLoad () {
	if(document.querySelector('#RecaptchaInitScript')) return

	const recatpchaEl = document.createElement('script');
	recatpchaEl.async = '1'
	recatpchaEl.src = 'https://www.google.com/recaptcha/api.js'
	recatpchaEl.id = 'RecaptchaInitScript'
	document.body.appendChild(recatpchaEl)
}