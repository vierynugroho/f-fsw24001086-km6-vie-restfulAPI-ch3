const checkImageField = (image) => {
	if (image === null || image === '' || image === undefined) {
		throw Error('Missing Required Field Image!');
	}
};

module.exports = checkImageField;
