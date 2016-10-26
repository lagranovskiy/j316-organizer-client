import {Component, OnInit} from '@angular/core';
import {GroupModel} from "../model/GroupModel";
import {PersonModel} from "../model/PersonModel";

@Component({
  selector: 'app-dashboard-home',
  template: `
        <div class="container">
        
        <div class="section">
        <div class="row">
        <H5>Gruppen</H5>
        <div *ngFor="let singleGroup of groupList">
          <group [groupName]="singleGroup.groupName"></group>
        </div>
        </div>
        </div>
        
        <div class="section">
        <div class="row">
        <H5>Personen</H5>
        <div class="row" *ngFor="let singlePerson of personList">
          <person [person]="singlePerson"></person>
        </div>
        </div>
        </div>
        
        <div class="section">
          <h5>Plan Information</h5>
        <table border="1" class="striped">
        <thead>
          <tr>
            <td></td>
        <td>01.01</td>
        <td>07.01</td>
        <td>14.01</td>
        <td>01.02</td>
        <td>14.02</td>
        <td>21.02</td>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="7">Gruppe 1</td>
        </tr>
        <tr>
          <td>Leo, Max</td>
        <td>x</td>
        <td></td>
        <td></td>
        <td></td>
        <td>x</td>
        <td></td>
        </tr>
        </tbody>
        </table>
        
        </div>
        
        </div>

`
})
export class DashboardHomeComponent implements OnInit {

  private groupList: Array<GroupModel> = [];
  private personList: Array<PersonModel> = [];

  constructor() {
    this.groupList.push(new GroupModel({groupName: 'Group1'}));
    this.groupList.push(new GroupModel({groupName: 'Group2'}));
    this.groupList.push(new GroupModel({groupName: 'Group3'}));
  }

  ngOnInit() {
  }

}
