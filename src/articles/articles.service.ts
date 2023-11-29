import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { messageHandler } from 'src/utils/helpers';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto) {
    const article = await this.prisma.article.create({data: createArticleDto})

    return messageHandler("Article created successfully", true, HttpStatus.OK, article)
  }

  async findAll() {
    const articles = await this.prisma.article.findMany({where: { published: true }});

    return messageHandler("Articles fetched successfully", true, HttpStatus.OK, articles)
  }

  async findDrafts() {
    const draftArticles = await this.prisma.article.findMany({ where: { published: false } })

    return messageHandler("Draft Articles fetched successfully", true, HttpStatus.OK, draftArticles)
  }

  async findOne(id: number) {
    const article = await this.prisma.article.findUnique({where: {id}});

    return messageHandler("Article fetched successfully", true, HttpStatus.OK, article)
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.prisma.article.update({
      where: {id},
      data: updateArticleDto
    });

    return messageHandler("Article updated successfully", true, 200, article)
  }

  async remove(id: number) {
    const article = await this.prisma.article.delete({where: {id}});

    return messageHandler("Article deleted successfully", true, HttpStatus.OK, article)
  }
}
