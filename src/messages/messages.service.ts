import { Injectable, NotFoundException } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
@Injectable()
export class MessagesService {
  findAll() {
    const result = readFileSync('data.json', 'utf-8');
    const msgData = JSON.parse(result);
    return msgData;
  }

  findOneMsg(id: string) {
    const contents = readFileSync('data.json', 'utf8');
    const messages = JSON.parse(contents);
    if (!messages.hasOwnProperty(id)) {
      throw new NotFoundException(
        `Enter correct id to modify data , No data found with id:${id}`,
      );
    }
    return messages[id];
  }

  createMsg(content: string) {
    const file = readFileSync('data.json', 'utf-8');
    const result = JSON.parse(file);
    const id = Math.round(Math.random() * 9999);
    result[id] = { id, content };
    writeFileSync('data.json', JSON.stringify(result));
  }

  //====================================================================================//
  //---------------------------SELF DONE LOGIC STARTS HERE---------------------------//
  deleteOne(id: string) {
    const result = readFileSync('data.json', 'utf-8');
    const msgData = JSON.parse(result);
    if (!msgData.hasOwnProperty(id)) {
      throw new NotFoundException(
        `Enter correct id to modify data , No data found with id:${id}`,
      );
    }
    delete msgData[id];
    writeFileSync('data.json', JSON.stringify(msgData));
    return `entry with id:${id} deleted successfully`;
  }

  modifyExisting(id: string, newContent: string) {
    const file = readFileSync('data.json', 'utf8');
    const result = JSON.parse(file);
    if (!result.hasOwnProperty(id)) {
      throw new NotFoundException(
        `Enter correct id to modify data , No data found with id:${id}`,
      );
    }
    result[id].content = newContent;
    writeFileSync('data.json', JSON.stringify(result));
    return `Existing data modified , id is ${id}`;
  }
}
//---------------------------SELF DONE LOGIC ENDS HERE---------------------------//
//====================================================================================//
