import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry, switchMap } from 'rxjs/operators';

@Injectable()
export class HttpService {

    constructor(private httpClient: HttpClient  ) {}
    post(email: string,password: string){
        const res = this.httpClient.post("http://localhost:8000/api/auth/login",{email,password})
        return res
    }
    get(url:string){
        const res = this.httpClient.get(url);
        return res
    }
    put(data:object,url:string){
        const res = this.httpClient.put(url,data)
        return res
    }
    
    }
