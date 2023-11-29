import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class userService {
  url: string = "http://localhost:4000";
  userId: string = localStorage.getItem("id") || "";
  constructor(private http: HttpClient) { }
  getList() {
    return this.http.get(this.url + '/get-list' + `/${this.userId}`).pipe(map((res: any) => {
      return res;
    }));
  }
  editList(itemId: string, newMsg: string, newTitle: string) {
    //ADDED TITLE,ADD IT TO BACKEND
    return this.http.put(this.url + '/edit-list-item', { userId: this.userId, itemId: itemId, msg: newMsg, newTitle }).pipe(map((res: any) => {
      return res;
    }));
  }
  removeFromList(itemId: string) {
    const params = new HttpParams()
      .set('userId', this.userId)
      .set('itemId', itemId)
    return this.http.delete(this.url + '/remove-from-list', { params }).pipe(map((res: any) => {
      return res;
    }));
  }
  addToList(msg: string, title: string, color: string) {
    //ADDED TITLE and COLOR,ADD IT TO BACKEND
    return this.http.post(this.url + '/add-to-list', { userId: this.userId, msg: msg, title: title, color: color }).pipe(map((res: any) => {
      return res;
    }));
  }
}
