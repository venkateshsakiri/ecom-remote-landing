import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../services/auth/auth.service";
import { RootScopeData } from "../rootScope/rootScopeData";
import { ChatService } from "../services/chat.service";
import { DatePipe } from "@angular/common";
import { io , Socket } from "socket.io-client";
import { environment } from "src/environments/environment";

@Component({
    selector: "app-chatting",
    templateUrl: "./chatting.component.html",
    styleUrls: ["./chatting.component.scss"],
    providers:[DatePipe]
})
export class ChattingComponent implements OnInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
    usersList: any;
    userInfo: any;
    selectedUser: any;
    message:any;
    messageList:any = [];
    public selectedImage:any;
    public errorMessage: string | null = null;
    public socket:Socket;

    constructor(public authUsers: AuthService,public chatService:ChatService,public datePipe:DatePipe) {
      this.getAllUsers();
      this.socket = io(environment.baseUrl);
      this.socket.on('updateUserStatus', (onlineUsers) => {
        this.usersList.forEach((element:any) => {
          element.isActive = onlineUsers.includes(element._id);
        });
      });
    //   this.socket.on('updateUnreadCount', (count) => {
    //     // Update the UI to show the unread message count
    //     // updateUnreadCountUI(count);
    //     console.log(count)
    // });

    }

    ngOnInit(): void {
      this.listenForMessages(); // Listen for incoming messages
        this.userInfo = RootScopeData.userInfo?.user;
        this.getUnreadMessages();

    }

    public getAllUsers() {
        this.authUsers.getAllUsers().subscribe(
            (res: any) => {
                this.usersList = res?.data.filter(
                    (item: any) =>
                        !(item?._id === RootScopeData.userInfo?.user?.id)
                );
                // this.usersList = res?.data;

            },
            () => {}
        );
    }
    getImageSrc(base64String: string): string {
        if (!base64String) {
            return "path/to/default/image.jpg"; // Default image if none provided
        }

        if (!base64String.startsWith("data:image")) {
            return "data:image/jpeg;base64," + base64String;
        }

        return base64String;
    }

  public selectedUsers(user:any){
    this.selectedUser = user;
    this.getAllMessages();
    this.scrollToBottom();
    this.socket.emit('openChat', user?._id);
    this.usersList.forEach((element:any) => {
      if(element._id == user._id){
        element.count = 0;
      }
    });
  }

  // public sendMessages(){
  //   this.chatService.sendMessage(this.selectedUser,{text:this.message,image:'',senderId:this.userInfo?.id}).subscribe((res:any)=>{
  //     console.log(res)
  //     this.message = '';
  //     let message = res?.data
  //     this.messageList = [...this.messageList,message];
  //     console.log(this.messageList)
  //   },()=>{

  //   })
  // }

  public sendMessages() {
    this.chatService.sendMessage(this.selectedUser, { text: this.message, image: '', senderId: this.userInfo?.id });
    this.message = ''; // Clear the input after sending
    this.scrollToBottom();
  }
  private scrollToBottom(): void {
    setTimeout(() => {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }, 0);
}

  public updateDateFormat(date:any){
    return this.datePipe.transform(date,'short')
  }

  public getAllMessages(){
    this.chatService.getAllMessagesList(this.selectedUser,{currentUser:this.userInfo?.id}).subscribe((res:any)=>{
      // console.log(res)
      this.messageList = res?.data;
    },()=>{

    })
  }

  private listenForMessages() {
    this.chatService.getMessages().subscribe(
        (message: any) => {
            if(message?.success){
              this.messageList.push(message?.message); // Add incoming message to the list
            }
            this.errorMessage = null; // Clear any previous error messages
        },
        (error) => {
            console.error('Error receiving message:', error);
        }
    );
  }


  private getUnreadMessages() {
    this.chatService.unReadMessages().subscribe(
        (message: any) => {
            const filteredData = message.filter(item =>
              item.senderId !== this.selectedUser?._id && item.senderId !== item.receiverId
            );
            const countMap = {};
            filteredData.forEach(message => {
                countMap[message.senderId] = message.count;
            });

            // Update the users array to include the count if the _id matches senderId
            this.usersList.forEach((user:any) => {
                if (countMap[user._id]) {
                    user.count = countMap[user._id]; // Add count key
                }
            });
            this.usersList.sort((a:any, b:any) => (a.count ? -1 : 1))
        },
        (error) => {
            console.error('Error receiving message:', error);
        }
    );
  }
}
