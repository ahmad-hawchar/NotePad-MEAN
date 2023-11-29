import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { colors } from '../../interfaces/colors';
import { list } from '../../interfaces/list';
import { userService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  constructor(private router: Router, private userService: userService) { }
  toggleColors: boolean = false;
  top: colors = {
    red: 70,
    orange: 70,
    green: 70,
    pink: 70,
    cyan: 70,
  };

  notes: list[] = [
    { _id: "1", title: "test", textContent: "test", color: "red", date: Date().substring(0, 10), editing: false },
    { _id: "2", title: "test", textContent: "test", color: "cyan", date: Date().substring(0, 10), editing: false },
    { _id: "3", title: "test", textContent: "test", color: "orange", date: Date().substring(0, 10), editing: false },
    { _id: "4", title: "test", textContent: "test", color: "pink", date: Date().substring(0, 10), editing: false },
    { _id: "5", title: "test", textContent: "test", color: "green", date: Date().substring(0, 10), editing: false },
    { _id: "6", title: "test", textContent: "test", color: "orange", date: Date().substring(0, 10), editing: false },
    { _id: "7", title: "test", textContent: "test", color: "red", date: Date().substring(0, 10), editing: false }
  ]
  handleColors() {
    this.toggleColors = !this.toggleColors;
    if (!this.toggleColors) {
      this.top = {
        red: 70,
        orange: 70,
        green: 70,
        pink: 70,
        cyan: 70,
      };
    } else {
      this.top = {
        red: 130,
        orange: 170,
        green: 210,
        pink: 250,
        cyan: 290,
      };
    }

  }

  handleAddNote(color: string) {
    let temp = { _id: "", title: "", textContent: "", color: color, date: Date().substring(0, 10), editing: true };
    this.notes.unshift(temp);
  }

  handleEdit(id: string, title: string, content: string, color: string) {
    if (id != "")
      this.userService.editList(id, title, content).subscribe({
        next: (e: any) => {
          console.log(e)
        },
        error: (e: any) => {
          console.log(e)
        }
      })
    else {
      this.userService.addToList(content, title, color).subscribe({
        next: (e: any) => {
          console.log(e)
        },
        error: (e: any) => {
          console.log(e)
        }
      })
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/authentication")
  }
}
