import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../animations';
import axios from "axios";
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideInAnimation],
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  public error: string;
  public inputEmail: FormControl;
  public inputEmail2: FormControl;
  public inputPassword: FormControl;
  public inputPassword2: FormControl;
  public inputPassword3: FormControl;
  public checkBox: FormControl;
  public message: string;
  public errorMessage: boolean;
  public successMessage: string;
  public messageSuccess: boolean;
  public signIn = true;
  public current = "register";

  constructor(private router: Router) {
    this.inputEmail = new FormControl();
    this.inputEmail2 = new FormControl();
    this.inputPassword = new FormControl();
    this.inputPassword2 = new FormControl();
    this.inputPassword3 = new FormControl();
    this.checkBox = new FormControl();
  }

  ngOnInit(): void {
    if (this.signIn) {
      this.current = "register"
    } else {
      this.current = "sign in"
    }
  }


  showMessageError(str: string) {
    this.message = str;
    this.errorMessage = true;

    setTimeout(() => {
      this.errorMessage = false;
    }, 10000);

  }

  showMessageSuccess(str: string) {
    this.successMessage = str;
    this.messageSuccess = true;

    setTimeout(() => {
      this.messageSuccess = false;
    }, 10000);

  }

  toggleSignin() {
    this.signIn = !this.signIn;
    if (this.signIn) {
      this.current = "register"
    } else {
      this.current = "sign in"
    }
  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase());
  }

  login() {
    if (this.inputEmail.value == null || this.inputPassword.value == null) {
      this.showMessageError("Input cannot be empty!")
      return;
    }
    if (!this.validateEmail(this.inputEmail.value)) {
      this.showMessageError("Invalid email format!")
      return;
    }


    let user = {
      email: <string>this.inputEmail.value,
      password: <string>this.inputPassword.value
    }
    axios.post("http://localhost:5000/login", user)
      .then(res => {
        if (res.status == 200) {
          localStorage.setItem("token", res.data.token);
          this.router.navigate(["/"]);
        }
        this.error = ""
      }, err => {
        this.showMessageError("Login failed! Maybe there is a typo somewhere?")
        console.log(err.response);
        this.error = err.response.data.error
      })
  }

  register() {
    if (!this.validateEmail(this.inputEmail2.value)){
      return this.showMessageError("Invalid e-mail format")
    }

    if (!(this.checkBox.value == true)){
      return this.showMessageError("Agreeing to the terms is mandatory")
    }

    if (this.inputEmail2.value == null || this.inputPassword2.value == null){
      return this.showMessageError("Input cannot be empty!")
    }

    if ( this.inputPassword2.value != this.inputPassword3.value){
      return this.showMessageError("Passwords didn't match!")
    }

    let newUser = {
      name: "none",
      email: <string>this.inputEmail2.value,
      password: <string>this.inputPassword3.value
    }

    axios.post('http://localhost:5000/signup', newUser)
      .then(res => {
        console.log(res)
        this.error = "";
        this.toggleSignin()
        this.errorMessage = false;
        this.showMessageSuccess("Registered successfuly. You can now login!");
      }, err => {
        console.log(err.response)
        this.showMessageError(<string>err.response.data.error)
      })
  }
}


