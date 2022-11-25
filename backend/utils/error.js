export const createError = (status, message) => { //custom error display function
  const err = new Error();
  err.status = status;
  err.message = message;
  return err;
};
