import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const IMPORT_MODULES = [
  // Do NOT include UniversalModule, HttpModule, or JsonpModule here
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  // TransferHttpModule,
  // HttpModule,
  // SlimLoadingBarModule.forRoot()
];

const EXPORT_MODULES = [
  // Do NOT include UniversalModule, HttpModule, or JsonpModule here
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  // SlimLoadingBarModule
];

const PIPES = [
  // put pipes here

];

const COMPONENTS = [

];

const DIRECTIVES = [

];

@NgModule({
  imports: [
    ...IMPORT_MODULES
  ],
  declarations: [
    ...PIPES,
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  exports: [
    ...EXPORT_MODULES,
    ...PIPES,
    ...COMPONENTS,
    ...DIRECTIVES
  ],
})
export class SharedModule {}
