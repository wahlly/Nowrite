import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AllArticlesEntityResponse, ArticleEntityResponse } from './entities/article.entity';
import { SERVER_ERROR_Exception } from 'src/utils/error/http-exception.filter';
import { Request, Response } from 'express';
import { ImessageHandler } from 'src/utils/helpers';

@Controller('articles')
@ApiTags('Articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({type: ArticleEntityResponse})
  // create(@Body() createArticleDto: CreateArticleDto) {
    async create(@Res() res: Response, @Body() createArticleDto: CreateArticleDto) {
    try {
      const  result: ImessageHandler = await this.articlesService.create(createArticleDto);

      res.status(result.statusCode).json(result)
    } catch (error) {
      console.log(error.message)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success: false, message: error.message})
    }
  }

  @Get()
  @ApiOkResponse({type: AllArticlesEntityResponse})
  async findAll(@Res() res: Response) {
    try {
      const result = await this.articlesService.findAll();

      res.status(result.statusCode).json(result)
    } catch(error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success: false, message: error.message})
    }
  }

  @Get('drafts')
  @ApiOkResponse({type: AllArticlesEntityResponse, isArray: true})
  async findDrafts(@Res() res: Response) {
    try {
      const result = await this.articlesService.findDrafts();

      res.status(result.statusCode).json(result)
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success: false, message: error.message})
    }
  }

  @Get(':id')
  @ApiOkResponse({type: ArticleEntityResponse})
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.articlesService.findOne(+id);

      res.status(result.statusCode).json(result)
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success: false, message: error.message})
    }
  }

  @Patch(':id')
  @ApiOkResponse({type: ArticleEntityResponse})
  async update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto, @Res() res: Response) {
    try {
      const result = await this.articlesService.update(+id, updateArticleDto);

      res.status(result.statusCode).json(result)
    } catch(error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success: false, message: error.message})
    }
  }

  @Delete(':id')
  @ApiOkResponse({type: ArticleEntityResponse})
  async remove(@Param('id') id: string, @Req() res: Response ) {
  try {
    const result = await this.articlesService.remove(+id);

    res.status(result.statusCode).json(result)
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success: false, message: error.message})
  }
  }
}
