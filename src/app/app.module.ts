import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatToolbarModule,
  MatInputModule,
  MatProgressBarModule,
  MatCardModule,
  MatExpansionModule
} from '@angular/material';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { QueueComponent } from './queue/queue.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SearchComponent,
    ToolbarComponent,
    QueueComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
