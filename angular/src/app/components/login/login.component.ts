import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { UserService } from '../../user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, MatDividerModule, MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public usersList!: User[]
  public name!: string
  public password!: string
  public wrongPWD:boolean=false

  constructor(private _userService: UserService, private _router: Router) {
    this._userService.get_users().subscribe({ //להכניס לONINIT
      next: (res) => { this.usersList = res; },
      error: (err) => { console.log(err); }
    })
  }

  public loginForm: FormGroup = new FormGroup({
    "name": new FormControl(),
    "password": new FormControl()
  })

  public tryLogin() {
    let user = this.usersList.find(u => u.name == this.name)
    if (user != null) {
      if (user.password == this.password) {
        this._router.navigate(["recipes/all"])
        sessionStorage.setItem("currentUser", JSON.stringify(user));}
      else (this.wrongPWD=true)
    }
    else {
      this._router.navigate(['/register',this.name]);
    }
  }
  public signUp(){
    this.wrongPWD=false
    this._router.navigate(["register"])  }

}
