import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  isLoadingButtonSubject = new BehaviorSubject<boolean>(false);
  isLoadingButton$ = this.isLoadingButtonSubject.asObservable();
  
  constructor() { }

}
