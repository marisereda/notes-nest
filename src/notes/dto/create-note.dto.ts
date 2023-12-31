import { IsNotEmpty, IsString } from 'class-validator';
import { Category } from 'src/types';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  category: Category['name'];

  @IsNotEmpty()
  @IsString()
  content: string;
}
