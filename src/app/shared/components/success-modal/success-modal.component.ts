import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ModalData } from '../models/modal-data';
import { CustomButtomComponent } from '../custom-buttom/custom-buttom.component';

@Component({
  selector: 'app-success-modal',
  imports: [
    MatIcon,
    MatDialogContent,
    MatDialogModule,
    CustomButtomComponent
  ],
  templateUrl: './success-modal.component.html',
  styleUrl: './success-modal.component.scss'
})
export class SuccessModalComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData
  ) {}

  onConfirmClick(): void {
    this.dialogRef.close();
  }

}
