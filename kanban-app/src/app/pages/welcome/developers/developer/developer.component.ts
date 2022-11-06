import { Component, Input, OnInit } from '@angular/core';
import { DEVELOPER } from 'src/app/developers';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss'],
})
export class DeveloperComponent {
  @Input() developer!: DEVELOPER;
}
