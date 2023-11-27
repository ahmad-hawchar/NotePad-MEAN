import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class userService {
  url: string = "http://localhost:4000";
  constructor(private http: HttpClient) { }
  getList(userId: string) {
    this.http.get(this.url + '/get-list' + `/${userId}`).pipe(map((res: any) => {
      return res;
    }));
  }
  editList(userId: string, itemId: string, newMsg: string) {
    this.http.put(this.url + '/edit-list-item', { userId: userId, itemId: itemId, msg: newMsg }).pipe(map((res: any) => {
      return res;
    }));
  }
  removeFromList(userId: string, itemId: string) {
    const params = new HttpParams()
      .set('userId', userId)
      .set('itemId', itemId)
    this.http.delete(this.url + '/remove-from-list', { params }).pipe(map((res: any) => {
      return res;
    }));
  }
  addToList(userId: string, msg: string) {
    this.http.post(this.url + '/add-to-list', { userId: userId, msg: msg }).pipe(map((res: any) => {
      return res;
    }));
  }
}
