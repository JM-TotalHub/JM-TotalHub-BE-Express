import Joi from 'joi';

const CommentCreateBodyDto = Joi.object({
  content: Joi.string().max(500).required().messages({
    'string.base': 'Content must be a string',
    'string.empty': 'Content is required',
    'string.max': 'Content must be at most 500 characters long',
    'any.required': 'Content is required',
  }),
});

const CommentCreateDto = {
  body: CommentCreateBodyDto,
  query: null,
  params: null,
};

export default CommentCreateDto;
