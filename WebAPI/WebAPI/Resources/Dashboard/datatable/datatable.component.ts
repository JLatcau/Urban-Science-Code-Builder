import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  constructor() { }
title='datatable';
//Sample datatable data
jsonData : any=[
  {
    dealer: 'ABC Automotive',
    brand: 'UM',
    june17: '141',
    juneCYTD: '649'
  },
  {
    dealer: 'Bommarito Honda',
    brand: 'HOND',
    june17: '208',
    juneCYTD: '1075'
  },
  {
    dealer: 'Bommarito Nissan Inc',
    brand: 'NISS',
    june17: '136',
    juneCYTD: '761'
  },
  {
    dealer: 'Johhny Londoff Chevrolet, Inc',
    brand: 'CHEV',
    june17: '1126',
    juneCYTD: '763'
  }
];
  ngOnInit(): void {
  }

}
