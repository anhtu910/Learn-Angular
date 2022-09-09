import {  Component, DoCheck, OnInit  } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { logoutSuccess,loginSuccess } from './actions/login.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck,OnInit   {
  constructor(private store:Store<{login:{success:boolean,token:string}}>,private router:Router){
    this.store.select("login")
  }
hide:boolean=false
  ngDoCheck(): void {
    this.store.select("login").subscribe(data=>{
      if(data.success){
        this.hide=data.success
      }
    })
  }
  email = new FormControl('', [Validators.required, Validators.email]);
  ngOnInit() {
    if(localStorage.getItem("token")){
      this.store.dispatch(loginSuccess({success:true,token:localStorage.getItem("token") as string}))
    }
  }
  logout(){
    this.store.dispatch(logoutSuccess())
    this.hide=false
    localStorage.removeItem("token")
    this.router.navigate(["/login"])
  }
  public id = 0;
  title = '3siD-ng';
  anhtu='asdas';
}
