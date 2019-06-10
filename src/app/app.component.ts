import { Component } from '@angular/core';
import { UserSettingsService } from './servicios/settings-services/user-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appClinica';

  constructor(public _ajustes: UserSettingsService){}
}
