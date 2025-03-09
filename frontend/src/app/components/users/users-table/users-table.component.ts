// users-table.component.ts
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UsersFormComponent } from '../users-form/users-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../models/user.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users-table',
  standalone: true,
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule
  ],
})
export class UsersTableComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'rol', 'is_active', 'acciones'];

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Load users from the service
  loadUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (response) => {
        this.users = response; // No necesitas convertir is_active
      },
      error: (error) => {
        console.error('Error al obtener usuarios', error);
      },
    });
  }

  // Open dialog to add a new user
  openDialog(): void {
    const dialogRef = this.dialog.open(UsersFormComponent, {
      width: '500px',
    });

    // Reload users after the dialog closes
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers(); // Reload the users list
      }
    });
  }

  // Open dialog to edit an existing user
  editUser(user: User): void {
    const dialogRef = this.dialog.open(UsersFormComponent, {
      width: '500px',
      data: user, // Pass the user data to the form
    });

    // Reload users after the dialog closes
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers(); // Reload the users list
      }
    });
  }
}