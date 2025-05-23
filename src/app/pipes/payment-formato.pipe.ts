import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentFormato'
})
export class PaymentFormatoPipe implements PipeTransform {

  private translations: { [key: string]: string } = {
    'CC': 'Cartão de Crédito',
    'CD': 'Cartão de Débito',
    'PIX': 'Pix',
    'CASH': 'Dinheiro',
    'GYMPASS': 'Gympass'
  };

  transform(value: string | null | undefined, defaultText: string = 'Não possui Pagamento'): string {
    if (value === null || value === undefined || value.trim() === "") {
      return defaultText;
    }

    const upperValue = value.toUpperCase();
    return this.translations[upperValue] || defaultText; 
  }


}
