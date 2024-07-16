import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from './models/task.model';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks$: BehaviorSubject<Task[]>;
  selectedDate: Date = new Date();

  constructor(private taskService: TaskService) {
    this.tasks$ = new BehaviorSubject<Task[]>([]);
  }

  ngOnInit(): void {
    this.updateTaskList();
  }

  addTask(title: string): void {
    if (title.trim()) {
      this.taskService.addTask({ title, date: this.selectedDate });
      this.updateTaskList();
    }
  }

  onDateChange(event: string): void {
    this.selectedDate = new Date(event);
    this.updateTaskList();
  }

  toggleCompletion(id: number): void {
    this.taskService.toggleCompletion(id);
    this.updateTaskList();
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id);
      this.updateTaskList();
    }
  }

  private updateTaskList(): void {
    const tasks = this.taskService.getTasksByDate(this.selectedDate);
    this.tasks$.next(tasks);
  }
}