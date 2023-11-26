import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'any'
})
export class authService {
  constructor(private http: HttpClient) { }
  url: string = "http://localhost:4000";

  Login(email: string, password: string) {
    return this.http.post(this.url + "/login", { email: email, password: password }).pipe(map((res: any) => {
      if (res.success && res.result) {
        console.log(res)
        localStorage.setItem("userId", res.result)
      }
      return res;
    }));
  }

  Register(fullname: string, email: string, password: string) {
    return this.http.post(this.url + "/register", { email: email, password: password, fullname: fullname }).pipe(map((res) => {
      return res;
    }));
  }
}
