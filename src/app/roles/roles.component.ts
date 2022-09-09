import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface roles {
  created_at: string;
  id: number;
  name: string;
  updated_at: string;
}

// const ELEMENT_DATA: roles[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit,DoCheck {
  constructor(private http:HttpClient,private dialog: MatDialog, private _snackBar: MatSnackBar) { }
  ngDoCheck(): void {
  }
  hide:boolean=true;
  render:number=0
  displayedColumns: string[] = ['name', 'Created', 'Updated','Action'];
  dataSource!: roles[];
  ngOnInit(): void {
    this.reRender()
  }
  delete(id:number){
    const api=`http://localhost:8000/api/roles/${id}`
    this.http.delete(api).subscribe()
console.log(id)
  }
  reRender(){
    console.log(this.dataSource)
    const api=`http://localhost:8000/api/roles?page=${1}&search=${""}`
    this.http.get(api).pipe(map((data)=>{
      const res= data as {data:roles[]}
      this.dataSource=res.data.map((e: roles) => {
        return {
          key: e.id,
          ...e,
          name:e.name,
          Created: new Date(Date.parse(e.created_at)).toLocaleString(),
          Updated: new Date(Date.parse(e.updated_at)).toLocaleString(),
          Action: "Action",
        };
      })
      this.hide=false
      console.log(this.dataSource)
    }
    )
    
    ).subscribe()
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!==undefined){
        this.http.post("http://localhost:8000/api/roles",{name:result}).pipe(map((respone)=>{
          const res =respone as {status:string}
          console.log(respone)
          this._snackBar.open(res.status,"",{
            duration: 3000});
            this.reRender()
        })).subscribe()
      }
     
    });
  }

}
