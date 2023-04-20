import { Component } from '@angular/core';

// import { Product } from './models/product.model';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;

  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) { }

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.userService.create({
      name: 'Juan',
      email: 'juanlopez.developer@gmail.com',
      password: '1234'
    })
      .subscribe(rta => {
        console.log(rta);
      })
  }

  login() {
    this.authService.login('juanlopez.developer@gmail.com', '1234')
      .subscribe(rta => {
        console.log(rta.access_token);
      })
  }
}
