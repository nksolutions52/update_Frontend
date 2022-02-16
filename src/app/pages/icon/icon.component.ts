import { Component, OnInit } from '@angular/core';
import { ContactInfo } from '../dataModels/notificationModel';
import { TablesDataService } from '../index/tablesData.service';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  providers: [TablesDataService]
})
export class IconComponent implements OnInit {
  tableData: Array<any>;
  pageSize = 10;
  pageNumber = 1;
  contactInfo: ContactInfo;
  constructor(private _tablesDataService: TablesDataService) { }

  ngOnInit() {
    this.contactInfo = new ContactInfo();
    this.loadData();
  }

  loadData() {
    this.tableData = this._tablesDataService.DATA;
    console.log(this.tableData);
  }
  
  openModal(modal) {
    this.contactInfo = new ContactInfo();
    modal.open();
  }

  closeModal(modal) {
    modal.close();
  }

  addContact(modal) {
    this.tableData.splice(0, 0, this.contactInfo);
    modal.close();
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

}
