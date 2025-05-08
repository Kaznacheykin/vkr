export function send(url, options = {}, success, failure) {

	const {tries = 1} = options

	options.credentials = 'include'

	function onError(err){
		const triesLeft = tries - 1

		if (!triesLeft) throw err
		setTimeout(()=>{
			return send(url, {...options, tries: triesLeft}, success, failure)
		}, 500)

	}


	return fetch(url, options)
		.then(response => {

			return response.json()
		}).then(result => {
			if(result.errors) {
				onError(result.errors)

				if(failure) failure(result.errors)
			}

			if(result.redirect) {

				if(typeof result.redirect === "string") {
					document.location.href = result.redirect
					return
				}

				setTimeout(()=>{
					document.location.href = result.redirect.link
				}, result.redirect.delay || 0)
			}

			if(result.refresh) {
				location.reload()
				return
			}

			if(success) {
				success()
			}

			return new Promise((resolve, reject) => resolve(result))

		}).catch((err) => {

			onError(err)
	});

}