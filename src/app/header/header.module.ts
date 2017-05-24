import { NgModule } from '@angular/core';

// import { TransferHttpModule } from '../../modules/transfer-http/transfer-http.module';
// import { APP_BASE_HREF, CommonModule } from '@angular/common';
// import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header.component';
import { DialogComponent } from './header.component'
import {MdButtonModule, MdCheckboxModule,
   MdGridListModule, MdGridTile, MdDialogModule, 
   MdInputModule, MdMenuModule, MdIconModule} from '@angular/material';
@NgModule({
  declarations: [ 
  	HeaderComponent,
    DialogComponent
  ],
  imports: [
    SharedModule,
    MdMenuModule,
    MdButtonModule, 
    MdCheckboxModule,
    MdDialogModule,
    MdGridListModule,
    MdInputModule,
    MdIconModule
  ],
  entryComponents: [ 
    DialogComponent
  ],
  exports: [
  	HeaderComponent,
    
  ]
})
export class HeaderModule {
}