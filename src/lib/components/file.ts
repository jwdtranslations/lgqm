export const stringFirstNumber = (s: string) => {
	const num = s.match(/\d+/);
	if (num) {
		try {
			return parseInt(num[0]);
		} catch (error) {
			return null;
		}
	}
	return null;
};

export const sortFilesNumeric = (a: string, b: string) => {
	const aNum = stringFirstNumber(a);
	const bNum = stringFirstNumber(b);
	if (aNum !== null && bNum !== null) {
		return aNum - bNum;
	}
	return 0;
};
