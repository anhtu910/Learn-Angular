import { Component, Input, OnInit } from '@angular/core';
import { roles } from '../roles/roles.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() hide: boolean=true;
  @Input() delete!:()=>{};
  @Input() displayedColumns: string[]=[];
  @Input() dataSource: roles[]=[];
  constructor() { }

  ngOnInit(): void {
  }

}
