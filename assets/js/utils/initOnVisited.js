export function initOnVisited (target, callback, options) {
	let interestingBlocks;
	if ("IntersectionObserver" in window) {
		interestingBlocks = document.querySelectorAll(target);
		const observer = new IntersectionObserver(function(entries, observer) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					callback(entry.target)
					observer.unobserve(entry.target);
				}
			});
		},{
			threshold: 0
		});
		interestingBlocks.forEach(function(block) {
			observer.observe(block);
		});
	} else {
		let timeout;
		interestingBlocks = document.querySelectorAll(target);
		function onInteresting () {
			if(timeout) {
				clearTimeout(timeout);
			}
			timeout = setTimeout(function() {
				const scrollTop = window.pageYOffset;
				interestingBlocks.forEach(function(block) {
					if(block.offsetTop < (window.innerHeight + scrollTop)) {
						callback(block)
					}
				});
				if(interestingBlocks.length === 0) {
					document.removeEventListener("scroll", onInteresting);
					window.removeEventListener("resize", onInteresting);
					window.removeEventListener("orientationChange", onInteresting);
				}
			}, 20);
		}
		document.addEventListener("scroll", onInteresting);
		window.addEventListener("resize", onInteresting);
		window.addEventListener("orientationChange", onInteresting);
	}
}