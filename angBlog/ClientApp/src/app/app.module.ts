import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//import { LoginModule } from './login/login.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FileSelectDirective } from 'ng2-file-upload';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    //BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    // LoginModule,          // Eager loaded since we may need to go here right away as browser loads based on route user enters
    AppRoutingModule,     // Main routes for application
    CoreModule,           // Singleton objects (services, components that are loaded only once, etc.)
    SharedModule,          // Shared (multi-instance) objects
    HttpClientModule
  ],
  declarations: [AppComponent,
    FileSelectDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
