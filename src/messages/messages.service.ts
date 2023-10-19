import { Injectable, NotFoundException } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { stringify } from 'querystring';
import { v4 as uuid } from 'uuid';
@Injectable()
export class MessagesService {
  //----------------find all data logic starts here----------------//
  findAll() {
    const result = readFileSync('data.json', 'utf-8');
    const msgData = JSON.parse(result);
    return msgData;
  }
  //----------------find all data logic ends here----------------//

  //---------------create new data entry logic starts here------//
  createMsg(content: string) {
    const file = readFileSync('data.json', 'utf-8');
    const result = JSON.parse(file);
    const id = uuid().slice(0, 8);
    result.push({ id, content });
    writeFileSync('data.json', JSON.stringify(result));
  }
  //----------------create new data entry logic ends here-------//

  //----------------find data as per id logic starts here----------------//
  findOneMsg(requestedId: string) {
    const contents = readFileSync('data.json', 'utf8');
    const messages = JSON.parse(contents);
    let matchId = messages.filter((val) => val.id === requestedId)[0];
    if (!matchId) {
      throw new NotFoundException(
        `No data found with given id - ${requestedId}`,
      );
    }
    const { id, content } = matchId;
    return `${content}`;
  }
  //----------------find data as per id logic ends here----------------//

  //====================================================================================//
  //---------------------------SELF DONE LOGIC STARTS HERE---------------------------//
  deleteOne(incomingId: string) {
    const result = readFileSync('data.json', 'utf-8');
    let msgData = JSON.parse(result);
    let matchedId = msgData.filter((val) => val.id === incomingId);
    if (matchedId.length === 0) {
      throw new NotFoundException(
        `Enter correct id to modify data , No data found with id:${incomingId}`,
      );
    }
    const removeItem = msgData.filter((val) => val.id !== incomingId);
    msgData = removeItem;
    writeFileSync('data.json', JSON.stringify(removeItem));
  }

  modifyExisting(incomingId: string, newContent: string) {
    const file = readFileSync('data.json', 'utf8');
    let result = JSON.parse(file);

    result = result.map((item) => {
      if (item.id === incomingId) {
        return { ...item, content: newContent };
      }
      return item;
    });
    writeFileSync('data.json', JSON.stringify(result), 'utf-8');
  }
}
//---------------------------SELF DONE LOGIC ENDS HERE---------------------------//
//====================================================================================//
