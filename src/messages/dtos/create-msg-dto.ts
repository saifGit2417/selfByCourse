import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  content: string;

  @IsString()
  id?: string;
}

// export class ModifyMessageDto {

// }
