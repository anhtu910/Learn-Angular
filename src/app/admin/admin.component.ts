import { Component, OnInit } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
// import {Component} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { Router } from '@angular/router';
interface FoodNode {
  name: string;
  url?:string;
  children?: FoodNode[] ;
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{name: 'Categoris',url:"/admin/categoris"}, {name: 'Roles',url:"/admin/roles"}, {name: 'Fruit loops'}],
  }
];
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();
  navigate(element:string){
    this.router.navigate([element])
  }
  constructor(private router:Router) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
  ngOnInit(): void {
  }

}
