import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateContractStatus'
})
export class TranslateContractStatusPipe implements PipeTransform {

  private translations: { [key: string]: string } = {
    'ACTIVE': 'Ativo',
    'PENDING': 'Pendente',
    'EXPIRED': 'Expirado',
    'CANCELED': 'Cancelado',
    'FINISHED': 'Finalizado',
    'NONE': 'Nenhum',
  };

  transform(value: string | null | undefined, defaultText: string = 'Não Definido'): string {
    if (value === null || value === undefined || value.trim() === "") {
      return defaultText;
    }

    const upperValue = value.toUpperCase();
    return this.translations[upperValue] || defaultText; 
  }

}
