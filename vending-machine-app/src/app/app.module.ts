// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VendingMachineService } from './vending-machine.service';
import { VendingMachineComponent } from './vending-machine/vending-machine.component';



@NgModule({
  declarations: [AppComponent, VendingMachineComponent],
  imports: [BrowserModule, FormsModule],
  providers: [VendingMachineService],
  bootstrap: [AppComponent],
})
export class AppModule {}
