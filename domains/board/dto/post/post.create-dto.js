import Joi from 'joi';

const PostCreateBodyDto = Joi.object({
  title: Joi.string().max(100).required().messages({
    'string.base': 'Title must be a string',
    'string.empty': 'Title is required',
    'string.max': 'Title must be at most 100 characters long',
    'any.required': 'Title is required',
  }),
  content: Joi.string().max(10000).required().messages({
    'string.base': 'Content must be a string',
    'string.empty': 'Content is required',
    'string.max': 'Content must be at most 10000 characters long',
    'any.required': 'Content is required',
  }),
});

// DTO 객체
const PostCreateDto = {
  body: PostCreateBodyDto,
  query: null,
  params: null,
};

export default PostCreateDto;
