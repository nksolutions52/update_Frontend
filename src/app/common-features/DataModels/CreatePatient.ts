export class CreatePatient {
    firstname: string;
    lastname: string;
    gender: string;
    age: number;
    address: string;
    complaint: string;
    mobile: string;
    consulteeCount: number;

   
}

export class ConsultHistory {
    appDate: string;
    id: string;
    isActive: boolean;
    isVisited: boolean;
    patientId: string;
  showCal: boolean;
  showCheckbox: boolean;
  dateNTime: any;
  isEdit: boolean;
}