import { query } from 'express';
import Joi from 'joi';

const CommentListQueryDto = Joi.object({
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
  searchType: Joi.string().valid('content').optional().messages({
    'string.base': 'Search type must be a string',
    'any.only': 'Search type must be either "content"',
  }),
  searchText: Joi.string().max(100).optional().messages({
    'string.base': 'Search text must be a string',
    'string.max': 'Search text must be at most 100 characters long',
  }),
  sortField: Joi.string()
    .valid('id', 'content')
    .default('id')
    .messages({
      'string.base': 'Sort field must be a string',
      'any.only': 'Sort field must be either "id" or "content"',
    })
    .optional(),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc').messages({
    'string.base': 'Sort order must be a string',
    'any.only': 'Sort order must be either "asc" or "desc"',
  }),
});

const CommentListDto = {
  body: null,
  query: CommentListQueryDto,
  params: null,
};

export default CommentListDto;
