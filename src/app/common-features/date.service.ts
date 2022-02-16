import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(private datePipe: DatePipe) { }

  makeDateFormatYYYYMMD(val) {
    return this.datePipe.transform(val, 'yyyy-MM-dd HH:mm:ss');
  }

  makeDateFormatWithoutTime(val) {
    return this.datePipe.transform(val, 'yyyy-MM-dd');
  }

  makeDateFormatYYYYMMDD(val) {
    return this.datePipe.transform(val, 'yyyy-MM-ddTHH:mm');
  }

  
  getDateForBsDatePicker(date: string) {
    const d = Date.parse(date);
    return new Date(d);
  }

}
