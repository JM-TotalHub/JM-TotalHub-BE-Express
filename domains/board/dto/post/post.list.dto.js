import Joi from 'joi';

const PostListQueryDto = Joi.object({
  pageNum: Joi.number().integer().min(1).default(1).messages({
    'number.base': 'Page number must be a number',
    'number.integer': 'Page number must be an integer',
    'number.min': 'Page number must be at least 1',
  }),
  dataPerPage: Joi.number().integer().min(1).default(10).messages({
    'number.base': 'Data per page must be a number',
    'number.integer': 'Data per page must be an integer',
    'number.min': 'Data per page must be at least 1',
  }),
  searchType: Joi.string().valid('title', 'content').optional().messages({
    'string.base': 'Search type must be a string',
    'any.only': 'Search type must be either "title" or "content"',
  }),
  searchText: Joi.string().max(100).optional().messages({
    'string.base': 'Search text must be a string',
    'string.max': 'Search text must be at most 100 characters long',
  }),
  sortField: Joi.string()
    .valid('id', 'title', 'content')
    .default('id')
    .messages({
      'string.base': 'Sort field must be a string',
      'any.only': 'Sort field must be either "id", "title", or "content"',
    })
    .optional(),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc').messages({
    'string.base': 'Sort order must be a string',
    'any.only': 'Sort order must be either "asc" or "desc"',
  }),
});

// DTO 객체
const PostListDto = {
  body: null,
  query: PostListQueryDto,
  params: null,
};

export default PostListDto;
