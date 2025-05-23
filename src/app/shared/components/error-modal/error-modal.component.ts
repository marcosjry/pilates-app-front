import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ModalData } from '../models/modal-data';
import { MatIcon } from '@angular/material/icon';
import { CustomButtomComponent } from '../custom-buttom/custom-buttom.component';

@Component({
  selector: 'app-error-modal',
  imports: [
    MatIcon,
    MatDialogContent,
    MatDialogModule,
    CustomButtomComponent
  ],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.scss'
})
export class ErrorModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ErrorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData
  ) {}

  onConfirmClick(): void {
    this.dialogRef.close();
  }

}
