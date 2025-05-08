import { getCookie } from "../utils/getCookie"
import { getRootHostName } from "../utils/getRootHostName"

export function notice () {
	document.querySelectorAll('[data-notice-id]').forEach((notice)=> {
		const closeBtn = notice.querySelector('[data-notice-close]')

		if(closeBtn) {
			closeBtn.addEventListener('click', function() {
				notice.classList.add('hidden');
				document.cookie = notice.dataset.noticeId + "=true; domain="+ getRootHostName(document.domain) +"; path=/; max-age=" + 60 * 60 * 24 * 365;
			});
		}

		try {
			notice.classList[getCookie(notice.dataset.noticeId) ? 'add' : 'remove']('hidden');
		} catch (error) {
			notice.classList.add('hidden');
			console.info(error);
		}
	})
}