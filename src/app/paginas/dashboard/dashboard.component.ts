import { Component, OnInit } from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';

interface Node {
  name: string;
  link:string;
  children?: Node[];
}

/** Flat node with expandable and level information */
interface FlatNode {
  expandable: boolean;
  name: string;
  link:string,
  level: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  private _transformer = (node: Node, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      link: node.link,
      level: level,
    };
  };
  
  TREE_DATA: Node[] = [
    {
      name: 'Clientes',
      link: '/clientes'
      // children: [{name: 'Agregar'}, {name: 'editar'}, {name: 'eliminar'}],
    },
    {
      name: 'Planes',
      link:'/login'
    },
    {
      name: 'Suscripción',
      link:'/login'
    }
  ];

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable,
  );

  

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  
  constructor() {
    this.dataSource.data = this.TREE_DATA;
   }

  ngOnInit(): void {
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;
  
}
