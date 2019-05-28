const Validator = {
  isEmpty: (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === 'object' && Object.keys(value).length === 0) ||
      (typeof value === 'string' && value.trim().length === 0)
    )
  },

  isEmail: (value) => {
  	const emailRegEx =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  	return emailRegEx.test(value);
  }
}

module.exports = Validator;