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
  msg: string = "";
  top: colors = {
    red: 70,
    orange: 70,
    green: 70,
    pink: 70,
    cyan: 70,
  };

  notes: list[] = []
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
  getList() {
    this.userService.getList().subscribe({
      next: (e) => {
        if (e.success) this.notes = e.message.list.reverse()
        else this.msg = e.message
      },
      error: (e) => {
        this.msg = e.message
      }
    })
  }
  handleAddNote(color: string) {
    let temp = { _id: "", title: "", textContent: "", color: color, AddedOn: Date().substring(0, 10), editing: true };
    this.notes.unshift(temp);
  }

  handleEdit(id: string, title: string, content: string, color: string) {
    if (id != "")
      this.userService.editList(id, title, content).subscribe({
        next: (e: any) => {
          console.log(e)
          this.getList();
        },
        error: (e: any) => {
          this.msg = "we had an error editing your note"
        }
      })
    else {
      this.userService.addToList(content, title, color).subscribe({
        next: (e: any) => {
          console.log(e)
          this.getList();
        },
        error: (e: any) => {
          this.msg = "we had an error adding your note"
        }
      })
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/authentication")
  }
  ngOnInit(): void {
    this.getList();
  }
}

