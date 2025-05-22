import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoDataExtenso'
})
export class FormatoDataExtensoPipe implements PipeTransform {
  
  constructor(private datePipe: DatePipe) {}

  transform(value: string | Date | null | undefined, format?: string): string | null {
    if (!value) {
      return null;
    }

    const desiredFormat = format || 'dd \'de\' MMMM \'de\' yyyy';

    try {
      return this.datePipe.transform(value, desiredFormat);
    } catch (error) {
      console.error('Erro ao formatar data no FormatoDataExtensoPipe:', error, 'Valor recebido:', value)
      return value.toString();
    }
  }

}
