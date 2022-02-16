import { OnInit } from '@angular/core';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { DateService } from '../../common-features/date.service';
import { EditorService } from './editor.service';
import { CreatePatient } from '../../common-features/DataModels/CreatePatient';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];

  // events: CalendarEvent[] = [
  //   {
  //     start:addHours(startOfDay(new Date()),9),
  //     end: addHours(startOfDay(new Date()),17),
  //     title: 'Prasanna',
  //     color: colors.red,
  //     actions: this.actions,
  //     //allDay: true,
  //     // resizable: {
  //     //   beforeStart: true,
  //     //   afterEnd: true,
  //     // },
  //     // draggable: true,
  //   },
  //   // {
  //   //   start: startOfDay(new Date()),
  //   //   title: 'An event with no end date',
  //   //   color: colors.yellow,
  //   //   actions: this.actions,
  //   // },
  //   // {
  //   //   start: subDays(endOfMonth(new Date()), 3),
  //   //   end: addDays(endOfMonth(new Date()), 3),
  //   //   title: 'A long event that spans 2 months',
  //   //   color: colors.blue,
  //   //   allDay: true,
  //   // },
  //   // {
  //   //   start: addHours(startOfDay(new Date()), 2),
  //   //   end: addHours(new Date(), 2),
  //   //   title: 'A draggable and resizable event',
  //   //   color: colors.yellow,
  //   //   actions: this.actions,
  //   //   resizable: {
  //   //     beforeStart: true,
  //   //     afterEnd: true,
  //   //   },
  //   //   draggable: true,
  //   // },
  // ];

  activeDayIsOpen: boolean = false;
  startDate: string;
  endDate: string;
  appointments: Array<CreatePatient>;
  month: number;

  constructor(private modal: NgbModal, private dateService: DateService, private editorService: EditorService) {}
  
  ngOnInit() {
    this.getMonthAppointments();
  //  this.AnimationBarOption = this._chartsService.getAnimationBarOption();
  }

  getDates(dateVal) {
    this.startDate = '';
    this.endDate = '';
    this.appointments = new Array<CreatePatient>();
    var date = dateVal, year = date.getFullYear(), month = date.getMonth();
    var firstDay = new Date(year, month, 1);
    var lastDay = new Date(year, month + 1, 1);
    this.startDate = this.dateService.makeDateFormatYYYYMMD(firstDay);
    this.endDate = this.dateService.makeDateFormatYYYYMMD(lastDay);
  }

  getMonthAppointments() {
    this.getDates(new Date());
    this.getAppointments();
    
  }


  getPrevAppointments() {
    this.getDates(this.viewDate);
    this.getAppointments();
  }


  getAppointments() {
    this.events = [];
    this.editorService.getMonthAppointments(this.startDate, this.endDate).subscribe((response: any) => {
      if (response.isSuccess) {
        this.appointments = response.result;
        this.appointments.forEach((element: any) => {
          const stDate = this.dateService.getDateForBsDatePicker(element.appDate);
          const obj  =
            {
              start: addHours(startOfDay(stDate), 9),
              end: addHours(startOfDay(stDate), 17),
              title: element.patientId,
              color: colors.red,
              actions: this.actions,
            };
          this.events.push(obj);
        });
        this.events = [...this.events];
      }
    });
  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    const obj =   {
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      // draggable: true,
      // resizable: {
      //   beforeStart: true,
      //   afterEnd: true,
      // },
    }
    this.events.push(obj);
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  openModal(modal) {
    // this.contactInfo = new ContactInfo();
    modal.open();
  }
  closeModal(modal) {
    modal.close();
  }
}