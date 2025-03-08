import { Component, OnInit } from "@angular/core";
import { EventService } from "../demo/service/eventservice";

@Component({
    selector: "app-category-list",
    templateUrl: "./category-list.component.html",
    styleUrls: ["./category-list.component.scss"],
})
export class CategoryListComponent implements OnInit {
    events: any[];

    options: any;

    header: any;

    eventDialog: boolean;

    changedEvent: any;

    clickedEvent = null;

    constructor(private eventService: EventService) {}

    ngOnInit(): void {
      this.eventService.getEvents().then(events => {
        this.events = events;
        this.options = {...this.options, ...{events: events}};
    });

    this.options = {
        initialDate: '2025-01-01',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        eventClick: (e) => {
            this.eventDialog = true;

            this.clickedEvent = e.event;

            this.changedEvent.title = this.clickedEvent.title;
            this.changedEvent.start = this.clickedEvent.start;
            this.changedEvent.end = this.clickedEvent.end;
        }
    };

    this.changedEvent = {title: '', start: null, end: '', allDay: null};
    }
}
