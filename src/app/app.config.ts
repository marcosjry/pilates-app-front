import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormatTimePipe } from './pipes/format-time.pipe';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    MatDatepickerModule,
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(),
    DatePipe,
    BrowserAnimationsModule,
    provideAnimations(),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    MatDatepicker,
    provideNativeDateAdapter(),
    FormatTimePipe
  ]
};

