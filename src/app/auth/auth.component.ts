import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from './auth.service';
import { MatSnackBar} from '@angular/material/snack-bar'
import { Store } from '@ngrx/store';
import { loginSuccess} from '../actions/login.actions';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent   {
  log: boolean=false;
  @Input() cate :string | undefined;
  email =new FormControl();
  password =new  FormControl();
  hide = true;
  config: { mesasge: string; token: string; } | undefined;

  constructor(private auth:AuthService,private _snackBar: MatSnackBar,private store:Store<{login:{success:boolean,token:string}}>,private router:Router) {
    console.log(store.select('login'))
   }
  openSnackBar() {
    if(this.config!==undefined){
      this._snackBar.open(this.config.mesasge);
    }
   
  }
login(){
 const res=this.auth.login(this.email.value,this.password.value);
res.subscribe(data=>{
  if(data.success){
    this.store.dispatch(loginSuccess(data))
    this.hide=false
    this.router.navigate(["admin"])
  
  }
})
console.log(this.log)

  // const res =data as  {message:string,access_token:string}
  // this.config={mesasge:res.message,token:res.access_token}
  // this.openSnackBar()

}
// ngDoCheck() {
//   console.log('test 1 do check');
// }

}
