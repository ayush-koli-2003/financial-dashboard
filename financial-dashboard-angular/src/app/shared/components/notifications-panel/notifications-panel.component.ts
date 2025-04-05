import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notifications-panel',
  standalone: false,
  templateUrl: './notifications-panel.component.html',
  styleUrl: './notifications-panel.component.css'
})
export class NotificationsPanelComponent {
  @Input() isVisible:boolean = false;
  @Input() notifications:any[]=[];
  @Output() closeEvent = new EventEmitter();

  closePanel(){
    this.closeEvent.emit()
  }
}
