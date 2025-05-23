import { Injectable } from '@angular/core';
import { ModalData } from '../components/models/modal-data';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';
import { SuccessModalComponent } from '../components/success-modal/success-modal.component';
import { ComponentType } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private matDialog: MatDialog) { }

  capitalizeFirstLetter(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
    return formatter.format(date);
  }

  openErrorModal(sourceOp: string, modal: ComponentType<ErrorModalComponent>, ) {
    const errorData: ModalData = {
      title: `Falha ao Criar ${sourceOp}`,
      message: 'Não foi possível salvar os dados. Verifique os campos e tente novamente.',
      confirmText: 'OK'
    };
    this.matDialog.open(modal, {
      width: '450px',       
      data: errorData,      
      disableClose: true,   
      panelClass: 'error-modal-panel'
    })
  }

  openSuccessModal(sourceOp: string, modal: ComponentType<SuccessModalComponent>, ) {
    const successData: ModalData = {
      title: `${sourceOp} criado com Sucesso!`,
      message: 'O Cliente foi salvo com sucesso.',
      confirmText: 'OK'
    };
    this.matDialog.open(modal, {
      width: '450px',       
      data: successData,      
      disableClose: true,   
      panelClass: 'success-modal-panel'
    })
  }
}
