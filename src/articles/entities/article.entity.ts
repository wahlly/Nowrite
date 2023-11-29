import { ApiProperty } from "@nestjs/swagger";
import { Article } from "@prisma/client"
import { ApiResponse } from "src/utils/docs";

class ArticleEntity implements Article {
      @ApiProperty()
      id: number;
    
      @ApiProperty()
      title: string;
    
      @ApiProperty({ required: false, nullable: true })
      description: string | null;
    
      @ApiProperty()
      body: string;
    
      @ApiProperty()
      published: boolean;
    
      @ApiProperty()
      createdAt: Date;
    
      @ApiProperty()
      updatedAt: Date;
}

export class ArticleEntityResponse extends ApiResponse {
      @ApiProperty({type: ArticleEntity})
      data: object
}

export class AllArticlesEntityResponse extends ApiResponse {
      @ApiProperty({type: ArticleEntity, isArray: true})
      data: object
}