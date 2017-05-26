import { NgModule } from '@angular/core';

// import { TransferHttpModule } from '../../modules/transfer-http/transfer-http.module';
// import { APP_BASE_HREF, CommonModule } from '@angular/common';
// import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared/shared.module';
import { AutoVoteComponent } from './autoVote.component';
import { DialogComponent, DialogAddTaskComponent } from './autoVote.component'
import {MdButtonModule, MdCheckboxModule,
   MdGridListModule, MdGridTile, MdDialogModule, 
   MdInputModule, MdMenuModule, MdIconModule, 
   MdSlideToggleModule, MdCardModule, MdProgressBarModule} from '@angular/material';
@NgModule({
  declarations: [ 
  	AutoVoteComponent,
    DialogComponent,
    DialogAddTaskComponent
  ],
  imports: [
    SharedModule,
    MdMenuModule,
    MdButtonModule, 
    MdCheckboxModule,
    MdDialogModule,
    MdGridListModule,
    MdInputModule,
    MdIconModule,
    MdSlideToggleModule,
    MdCardModule,
    MdProgressBarModule
  ],
  entryComponents: [ 
    DialogComponent,
    DialogAddTaskComponent
  ],
  exports: [
  	AutoVoteComponent,
  ]
})
export class AutoVoteModule {
}