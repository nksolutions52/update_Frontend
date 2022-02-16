import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../../common-features/DataModels/loginModel';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginModel: LoginModel;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.loginModel = new LoginModel();
  }

  login() {
    this.loginService.login(this.loginModel).subscribe(response => {
      sessionStorage.setItem('token', response.token);
      this.router.navigate(['/pages']);
    });
    
  }

}
