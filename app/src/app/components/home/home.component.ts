import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { Router } from '@angular/router';
import { AlextivityService } from 'src/app/services/alextivity.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

  constructor(private routingService: RoutingService) { }

  ngOnInit(): void {
    this.routingService.init();
  }
}
