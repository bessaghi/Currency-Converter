import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideState, provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {ConverterEffects} from '../store/converter/converter.effects';
import {converterReducer} from '../store/converter/converter.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideStore(),
    provideState({name: 'converter', reducer: converterReducer}),
    provideEffects(ConverterEffects)
]
};
