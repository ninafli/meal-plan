import { NgModule } from '@angular/core';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatGridListModule,
  MatTabsModule,
  MatDivider,
  MatDividerModule,
  MatStepperModule,
  MatChipsModule,
  MatAutocompleteModule,
} from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatGridListModule,
    MatFormFieldModule,
    MatStepperModule,
    MatDividerModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatExpansionModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatStepperModule,
    MatGridListModule,
    MatFormFieldModule,
    MatTabsModule,
    MatDividerModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatExpansionModule
  ]
})
export class MaterialModule { }
