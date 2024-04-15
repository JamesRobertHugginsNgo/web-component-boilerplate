export default function makeHashCode(str) {
	let hash = 0;
	for (let index = 0; index < str.length; index++) {
			let charCode = str.charCodeAt(index);
			hash = (hash << 5) - hash + charCode;
			hash |= 0; // Convert to 32bit integer
	}
	return hash;
}
