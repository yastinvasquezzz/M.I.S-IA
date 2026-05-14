import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('ask')
  async askChatbot(@Body('message') message: string) {
    const response = this.chatbotService.getReply(message);
    return { response };
  }
}