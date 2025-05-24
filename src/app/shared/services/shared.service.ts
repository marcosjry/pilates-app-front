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

  getStatusClass(contractStatus: string){
    const validacoes: { [key: string]: string} = {
        ACTIVE: "Ativo",
        PENDING:"Pendente",
        CANCEL: "Cancelado",
        EXPIRED:"Expirado",
        null: "Nenhum"
    };
    const validacao = validacoes[contractStatus];
    return validacao;
  }

  getStatusBorderClass(contractStatus: string){
    const validacoes: { [key: string]: string} = {
      ACTIVE: "Ativo-border",
      PENDING: "Pendente-border",
      CANCEL: "Cancelado-border",
      EXPIRED: "Expirado-border",
      null: "Nenhum-border"
    };
    const validacao = validacoes[contractStatus];
    return validacao;
  }

  openErrorModal(sourceOp: string, modal: ComponentType<ErrorModalComponent>, message: string) {
    const errorData: ModalData = {
      title: `${sourceOp}`,
      message: `${message}`,
      confirmText: 'OK'
    };
    this.matDialog.open(modal, {
      width: '450px',       
      data: errorData,      
      disableClose: true,   
      panelClass: 'error-modal-panel'
    })
  }

  openSuccessModal(sourceOp: string, modal: ComponentType<SuccessModalComponent>, message: string) {
    const successData: ModalData = {
      title: `${sourceOp}`,
      message: `${message}`,
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
