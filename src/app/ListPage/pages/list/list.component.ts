import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  notes: { title: string, content: string, color: string }[] = [
    { title: "test", content: "test", color: "test" },
    { title: "test", content: "test", color: "test" },
    { title: "test", content: "test", color: "test" },
    { title: "test", content: "test", color: "test" }
  ]
}
