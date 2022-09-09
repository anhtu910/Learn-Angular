import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { HttpService } from '../httpAPI/http.service';

@Injectable()
export class AuthService {
  // public redirectUrl: string;
  constructor(private http: HttpService, private _snackBar: MatSnackBar,) {}
  openSnackBar(mesasge: string) {
    if (mesasge !== undefined) {
      this._snackBar.open(mesasge,"",{
        duration: 3000});
    }
  }
  login(email: string, password: string) {
    // console.log(this.http.post(email,password))
    const res = this.http.post(email, password).pipe(
      mergeMap((data) => {
        const res = data as { message: string; access_token: string };

        localStorage.setItem("token",res.access_token)
        this.openSnackBar(res.message);
        return of({success:true,token:res.access_token})
      }),
      catchError((err) => {
        this.openSnackBar(err.error.message);
        return of({success:false,token:""});
      })
    );
    return res;
  }
}
