import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ValidationException } from './error';
import HandleResponse from '../Response/HandleResponse';

export const classValidatorPipeInstance = (): ValidationPipe => {
  return new ValidationPipe({
    exceptionFactory(errors) {
      const firstError = errors[0]; // Get the first validation error

      if (firstError.constraints) {
        const [message] = Object.values(firstError.constraints);
        const fieldName = firstError.property;
        return HandleResponse.response(
          HttpStatus.UNPROCESSABLE_ENTITY,
          false,
          message,
          {
            fieldName,
          },
        );
      }

      return new ValidationException(
        {
          fieldName: firstError.property,
          message: 'Invalid input',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    },
  });
};
