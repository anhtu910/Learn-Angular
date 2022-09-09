import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AuthComponent } from './auth/auth.component';

@Injectable()
export class GLoginGuard implements CanActivate {
  constructor(private auth:AuthComponent,private router:Router,private store:Store<{login:{success:boolean,token:string}}>){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  return  this.store.select('login').pipe(map((data)=>{
      if(data.success){
        return true
      }
      this.router.navigate(["/login"])
      return false
    }))

  }
  
  
}

