import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.scss',
})
export class ChatbotComponent {
  isOpen = false;
  userInput = '';
  isTyping = false;
  messages: { text: string, type: 'user' | 'bot' }[] = [
    { text: '¡Hola! Soy el asistente de Matt Innova Solution. ¿En qué puedo ayudarte?', type: 'bot' }
  ];
  constructor(private chatService: ChatService) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMsg = this.userInput;
    this.messages.push({ text: userMsg, type: 'user' });
    this.userInput = '';

    this.isTyping = true;

    this.chatService.sendMessage(userMsg).subscribe(resp => {
      this.isTyping = false;
      this.messages.push({ text: resp.response, type: 'bot' });
    });
  }
  }
