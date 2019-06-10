import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSettingsService, SharedService, SidebarService } from './service.index';

@NgModule({
  declarations: [],
  providers: [
    UserSettingsService,
    SharedService,
    SidebarService
  ],
  imports: [
    CommonModule
  ]
})
export class ServiceModule { }
