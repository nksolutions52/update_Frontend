import { Component, OnInit } from '@angular/core';
import { DateService } from '../../common-features/date.service';
import { ConsultHistory, CreatePatient } from '../../common-features/DataModels/CreatePatient';
import { ChartsService } from '../charts/components/echarts/charts.service';
import { IndexService } from './index.service';
import { TablesDataService } from './tablesData.service';
import { GlobalService } from '../../shared/services/global.service';
import { RootComponent } from '../../shared/roots/root.component';
declare var jQuery:any;
declare var $: any; 
import { ViewChild, ElementRef} from '@angular/core';
import { ProfileService } from '../profile/profile.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [ChartsService, TablesDataService]
})
export class IndexComponent extends RootComponent implements OnInit {
  showloading: boolean = false;
  tableData: Array<CreatePatient>;
  pageSize = 10;
  pageNumber = 1;
  public AnimationBarOption;
  consulteeCount: number;
  appointmentCount: number;
  selectedConsultant: any;
  searchConsultee: "";
  consultantHisoryList: Array<ConsultHistory>;
  showTable: boolean;
  @ViewChild('myModal') myModal: ElementRef;
  createPatient: any;
  showCheckbox: boolean;

  constructor(private _chartsService: ChartsService,private profileService: ProfileService,private dateService: DateService, private indexService: IndexService, private _tablesDataService: TablesDataService,
    public _globalService: GlobalService) { 
      super(_globalService);
    }

  ngOnInit() {
    this.tableData = new Array<CreatePatient>();
    this.AnimationBarOption = this._chartsService.getAnimationBarOption();
    this.loadTable();
    this.getAppointmentCount();
  }

  loadTable() {
    this.tableData = new Array<CreatePatient>();
    this.indexService.getConsultees().subscribe((response:any) => {
    if(response.isSuccess) {
      this.tableData = response.result;
      this.consulteeCount = this.tableData[0].consulteeCount;
      
    }
   });
  }

  getAppointmentCount() {
    var today = new Date();
    var firstDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    var lastDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 0);
    var startDate = this.dateService.makeDateFormatYYYYMMD(firstDay);
    var endDate = this.dateService.makeDateFormatYYYYMMD(lastDay);
      this.indexService.getAppointmentCount(startDate,endDate).subscribe((response: any) => {
        if(response.isSuccess) {
          this.appointmentCount = response.result;
        }
    });
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  getConsultee(searchConsultee) {
    this.tableData = new Array<CreatePatient>();
    if(searchConsultee.length !== 0) {
      this.indexService.getSearchConsultee(searchConsultee).subscribe((response: any) =>{
        if(response.isSuccess) {
          this.tableData = response.result;
          this.consulteeCount = this.tableData[0].consulteeCount;
        }
      });
    } else {
      this.loadTable();
    }
    
  }

  

  

  openModal(modal, consultant) {
    this.consultantHisoryList = new Array<ConsultHistory>();
    this.selectedConsultant = consultant;
    this.showTable = false;
    this.indexService.getAppointmentsById(consultant.id).subscribe((response: any) => {
      if(response.isSuccess) {
        this.consultantHisoryList = response.result;
        this.showTable = true;
        this.consultantHisoryList.forEach(element => {
          element.showCal = false;
          element.showCheckbox = true;
          element.dateNTime = new Date().toISOString();
          const appDate = element.appDate.split(' ');
          const dateTime = this.dateService.makeDateFormatYYYYMMD(new Date()).split(' ');
          if(appDate[0] >= dateTime[0]) {
            element.isEdit = true;
          }
        });
        
      }
    });
    modal.open();
  }

  closeModal(modal) {
    modal.close();
  }

  setIsVisited(consultant) {
    const appDate = JSON.parse(JSON.stringify(consultant.appDate));
    const dateCompare = appDate.split(' ')[0];
    console.log(dateCompare);
    const currentDate = this.dateService.makeDateFormatWithoutTime(new Date()).toString();
    if(dateCompare === currentDate) {
      consultant.showCheckbox = false;
    } else {
      consultant.showCheckbox = true;
    }
  }

  edit(consultant) {
    console.log(consultant);
    consultant.showCal = true;
   this.setIsVisited(consultant);
  //  const appDate = consultant.appDate.split(' ');
    consultant.dateNTime = this.dateService.makeDateFormatYYYYMMDD(consultant.appDate).toString();

  }

  addAppointment() {
    const consult = new ConsultHistory();
    consult.showCal = true;
    this.showTable = true;
    consult.isVisited = false;
    // consult.dateNTime = '2021-07-25T18:40';
    consult.dateNTime = this.dateService.makeDateFormatYYYYMMDD(new Date()).toString();
    this.consultantHisoryList.push(consult);
   
  }

  add(consultant: ConsultHistory) {
    if(!consultant.isEdit) {
    const date2 = consultant.dateNTime.split('T');
    const exactDate = date2[0] + ' ' + date2[1] + ':00';
    const obj = {
      id: this.selectedConsultant.id,
      datetime: exactDate
      }

      this.indexService.createAppointment(obj, consultant.isVisited).subscribe((response:any) =>{
        if(response.httpStatus === "OK") {
          this.alertMessage ( 
            {
              type: 'success',
              title: 'Success',
              value: 'Appointment created Successfully'
            }
          );
        }
       
        
        this.closeModal(this.myModal);
      });
    } else {
      console.log('Edit', consultant);
      const date2 = consultant.dateNTime.split('T');
       const exactDate = date2[0] + ' ' + date2[1] + ':00';
       consultant.appDate = exactDate;
      //  consultant.id = consultant.patientId;
      this.indexService.editAppointment(consultant, consultant.isVisited).subscribe((response: any) =>{
        if(response.httpStatus === "OK") {
          this.alertMessage ( 
            {
              type: 'success',
              title: 'Success',
              value: 'Appointment Updated Successfully'
            }
          );
        }
        this.closeModal(this.myModal);
      });
    }
    if(consultant.isVisited) {
      this.generatePdf(this.selectedConsultant);
    }
    // jQuery("#myModal").modal("hide");
    // // this.myModal
    // //this.myModal.nativeElement.closeModal();
    // $("#myModal").modal("hide");\
    
  }

  generatePdf(val) {
  //  this.createPatient.complaint = undefined
  //  this.createPatient.age = 21
    this.profileService.generatePdf(val).subscribe((response:any) => {
    this.createPatient = new CreatePatient();
      var newBlob = new Blob([response], {type: "application/pdf"})
      const fileURL = URL.createObjectURL(newBlob);
      window.open(fileURL, '_blank');
    });
  }

  changeDate(consultant) {
    this.setIsVisited(consultant)
  }

}
