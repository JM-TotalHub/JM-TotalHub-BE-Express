import Joi from 'joi';

const PostUpdateBodyDto = Joi.object({
  title: Joi.string().max(100).required().messages({
    'string.base': 'String must be a string',
    'string.empty': 'String is required',
    'string.max': 'String must be at most 100 characters long',
    'any.required': 'String is required',
  }),
  content: Joi.string().max(10000).required().messages({
    'string.base': 'Content must be a string',
    'string.empty': 'Content is required',
    'string.max': 'Content must be at most 10000 characters long',
    'any.required': 'Content is required',
  }),
});

// DTO 객체
const PostUpdateDto = {
  body: PostUpdateBodyDto,
  query: null,
  params: null,
};

export default PostUpdateDto;
