import { extractDomain } from './extractDomain';

export function getRootHostName(url) {
	let parts = extractDomain(url).split('.');
	const partsLength = parts.length - 2;
	for (let i = 0; i < partsLength; i++) {
		parts.shift();
	}

	return parts.join('.');
}