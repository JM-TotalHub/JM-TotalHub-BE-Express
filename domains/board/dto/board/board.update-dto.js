import Joi from 'joi';

const BoardUpdateBodyDto = Joi.object({
  name: Joi.string().trim().max(100).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name is required',
    'string.max': 'Name must be at most 100 characters long',
    'any.required': 'Name is required',
  }),
  description: Joi.string().trim().max(500).required().messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description is required',
    'string.max': 'Description must be at most 500 characters long',
    'any.required': 'Description is required',
  }),
});

// DTO 객체
const BoardUpdateDto = {
  body: BoardUpdateBodyDto,
  query: null,
  params: null,
};

export default BoardUpdateDto;
