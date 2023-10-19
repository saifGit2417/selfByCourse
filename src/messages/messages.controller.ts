import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dtos/create-msg-dto';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get('/:id')
  findOneMsg(@Param('id') id: string) {
    return this.messageService.findOneMsg(id);
  }
  @Post('/add')
  createMessage(@Body() body: CreateMessageDto) {
    return this.messageService.createMsg(body.content);
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: string) {
    return this.messageService.deleteOne(id);
  }

  @Patch('/:id')
  modifyExisting(@Param('id') id: string, @Body() body: CreateMessageDto) {
    return this.messageService.modifyExisting(id, body.content);
  }
}
