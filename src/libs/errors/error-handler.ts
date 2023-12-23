import { BaseError } from '@libs/errors/base-error';

const errorHandler = (error: Error) => {
  console.error(error);
  
  if (error instanceof BaseError) { 
    return JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error)))
  }
};

export default errorHandler;
