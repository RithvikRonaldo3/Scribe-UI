import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {}

  socket = io(environment.socketUrl);

  public sendMessage(audio) {
    console.log('audio: ', audio);
    this.socket.emit('audio', audio);
  }

  public getNewMessage = () => {
    this.socket.on('audio', (message) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };
}
