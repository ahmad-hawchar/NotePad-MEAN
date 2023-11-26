import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  constructor(private router: Router) { }
  notes: { title: string, content: string, color: string, date: string }[] = [
    { title: "test", content: "test", color: "red", date: Date().substring(0, 10) },
    { title: "test", content: "test", color: "cyan", date: Date().substring(0, 10) },
    { title: "test", content: "test", color: "orange", date: Date().substring(0, 10) },
    { title: "test", content: "test", color: "pink", date: Date().substring(0, 10) },
    { title: "test", content: "test", color: "green", date: Date().substring(0, 10) },
    { title: "test", content: "test", color: "orange", date: Date().substring(0, 10) },
    { title: "test", content: "test", color: "red", date: Date().substring(0, 10) }
  ]
  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/authentication")
  }
}
