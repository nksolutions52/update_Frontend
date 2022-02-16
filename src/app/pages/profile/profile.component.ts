import { Component, OnInit } from '@angular/core';

import { RootComponent } from '../../shared/roots/root.component';
import { GlobalService } from '../../shared/services/global.service';
import { CreatePatient } from '../../common-features/DataModels/CreatePatient';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends RootComponent implements OnInit {
createPatient: CreatePatient;
  constructor(private profileService: ProfileService,
    private router: Router,
    public _globalService: GlobalService) { 
      super(_globalService);
    }

  ngOnInit() { 
    this.createPatient = new CreatePatient();
    this.createPatient.complaint = null;
  }

  addPatient() {
    console.log(this.createPatient);
    this.createPatient.complaint = undefined
   // this.createPatient.age = 21
    this.profileService.createPatient(this.createPatient, true).subscribe((response:any) => {
    
      if(response.isSuccess) {
        this.alertMessage(
          {
            type: 'success',
            title: 'Success',
            value: response.message
          }
        );

        this.createAppointment(response.result);
       this.generatePdf(response.result);
       
      // swal(
      //   'Sucess',
      //   'Please generate pdf',
      //   'question'
      // );
      }
    });
  }

  createAppointment(response) {
    this.profileService.createAppointment(response, true).subscribe((response:any) => {
      this.router.navigate(['/pages/editor']);
    });
  }

  generatePdf(val) {
    this.createPatient.complaint = undefined
  //  this.createPatient.age = 21
    this.profileService.generatePdf(val).subscribe((response:any) => {
    this.createPatient = new CreatePatient();
      var newBlob = new Blob([response], {type: "application/pdf"})
      const fileURL = URL.createObjectURL(newBlob);
      window.open(fileURL, '_blank');
    });
  }
  cancel(){
    this.createPatient = new CreatePatient()
  }
}
