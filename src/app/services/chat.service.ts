import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { io, Socket } from 'socket.io-client';
import { catchError, Observable, throwError } from 'rxjs';
import { RootScopeData } from '../rootScope/rootScopeData';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;

  constructor(private http: HttpClient) {
    this.socket = io(environment.baseUrl);
    window.addEventListener('beforeunload', () => {
      this.socket.disconnect(); // Disconnect the socket before the page unloads
    });

    let isRegistered = false;

    this.socket.on('connect', () => {
        const userId = RootScopeData?.userInfo?.user?.id; // Replace with actual user ID
        if (!isRegistered) {
            this.socket.emit('registerUser', userId);
            isRegistered = true; // Mark as registered
        }
    });

    // Log socket disconnection
    this.socket.on('disconnect', () => {
        console.log('Socket disconnected');
    });

    // Log any socket errors
    this.socket.on('error', (error) => {
        console.error('Socket error:', error);
    });

  }

  public sendMessage(selectedUser:any,req:any){
    this.socket.emit('sendMessage', { selectedUser, req }); // Emit message to server
    // return this.http.post(environment.baseUrl+'/api/chat/send/'+selectedUser?._id,req);
  }

  public getAllMessagesList(selectedUser:any,req:any){
    return this.http.post(environment.baseUrl+'/api/chat/'+selectedUser?._id,req);
  }

  // public getMessages() {
  //   return new Observable(observer => {
  //     this.socket.on('receiveMessage', (message) => {
  //       observer.next(message); // Emit received message to subscribers
  //     });
  //   });
  // }

  getMessages() {
    return new Observable(observer => {
        this.socket.on('receiveMessage', (message) => { // Change 'message' to 'receiveMessage'
            observer.next(message); // Emit received message to subscribers
        });

        this.socket.on('error', (error) => {
            console.error('Socket error:', error);
            observer.error(error); // Emit error to subscribers
        });

        // Cleanup on unsubscribe
        return () => {
            this.socket.off('receiveMessage'); // Change 'message' to 'receiveMessage'
            this.socket.off('error');
        };
    });
}


public unReadMessages() {
  return new Observable(observer => {
      this.socket.on('updateUnreadCount', (message) => { // Change 'message' to 'receiveMessage'
          observer.next(message); // Emit received message to subscribers
      });

      this.socket.on('error', (error) => {
          console.error('Socket error:', error);
          observer.error(error); // Emit error to subscribers
      });

      // Cleanup on unsubscribe
      return () => {
          this.socket.off('receiveMessage'); // Change 'message' to 'receiveMessage'
          this.socket.off('error');
      };
  });
}

}
