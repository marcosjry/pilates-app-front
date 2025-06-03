import { Component, OnDestroy, OnInit } from '@angular/core';
import { GenericInputComponent } from "../../shared/components/generic-input/generic-input.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CustomButtomComponent } from "../../shared/components/custom-buttom/custom-buttom.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { LoadingService } from '@shared/services/loading.service';
import { Router } from '@angular/router';
import { NoContentComponent } from "../../shared/components/no-content/no-content.component";

@Component({
  selector: 'app-login',
  imports: [
    GenericInputComponent,
    MatCardModule,
    CustomButtomComponent,
    ReactiveFormsModule,
    CommonModule
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {

  messageError!: string;
  submitted = false;
  loginForm!: FormGroup
  isButtonLoading: boolean = false;
  haveMessageError: boolean = false;
  private isUserAuthenticated: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder, 
    private service: AuthService, 
    private loading: LoadingService,
    private router: Router
  ) {
    
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(7)]],
    });
    this.loginForm.valueChanges.subscribe(() => this.haveMessageError = false);
    this.service.isUserAuthenticated$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(value =>{ 
      this.isUserAuthenticated = value;
      if(this.isUserAuthenticated)
        this.router.navigate(['home']);
      }
    );
    this.loading.isLoadingButton$.pipe(
      takeUntil(this.destroy$),
      debounceTime(1500)
    ).subscribe(value => this.isButtonLoading = value);
    this.service.onErrorMessage$.pipe(
      takeUntil(this.destroy$),
      debounceTime(1500)
    ).subscribe(value => this.messageError = value);
    this.service.haveMessageError$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(value => this.haveMessageError = value);
    this.messageError = ''
  }


  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    this.isButtonLoading = true;
    this.service.onLogin(this.loginForm.value);
    this.loading.isLoadingButtonSubject.next(false);
  }
}
