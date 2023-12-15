import { Component, OnInit } from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {ArrayDataSource} from '@angular/cdk/collections';

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  isExpanded?: boolean;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  TREE_DATA: ExampleFlatNode[] = [
    {
      name: 'clientes',
      expandable: true,
      level: 0,
    },
    {
      name: 'lista Clientes',
      expandable: false,
      level: 1,
    },
    {
      name: 'Agregar Cliente',
      expandable: false,
      level: 1,
    },
    
  ];

  dataSource = new ArrayDataSource(this.TREE_DATA);
  constructor() {
    
   }

  ngOnInit(): void {
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  getParentNode(node: ExampleFlatNode) {
    const nodeIndex = this.TREE_DATA.indexOf(node);

    for (let i = nodeIndex - 1; i >= 0; i--) {
      if (this.TREE_DATA[i].level === node.level - 1) {
        return this.TREE_DATA[i];
      }
    }

    return null;
  }

  shouldRender(node: ExampleFlatNode) {
    let parent = this.getParentNode(node);
    while (parent) {
      if (!parent.isExpanded) {
        return false;
      }
      parent = this.getParentNode(parent);
    }
    return true;
  }
  
}
