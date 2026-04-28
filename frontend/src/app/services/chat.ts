import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/chatbot/ask';

  constructor(private http: HttpClient, private router: Router) {}

  sendMessage(userMessage: string): Observable<any> {
    const currentPath = this.router.url;

    return this.http.post(this.apiUrl, {
      message: userMessage,
      context: currentPath
    }).pipe(
      catchError(error => {
        console.error('Error conectando con MIS-Bot:', error);
        return of({ response: 'Lo siento, mi conexión con el servidor de Matt Innova Solution se interrumpió.' });
      })
    );
  }
}
