import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
  isLoading:boolean=false;
  step:number=1;
  private readonly authService=inject(AuthService)
  private readonly router=inject(Router)
      VerfiyEmail:FormGroup= new FormGroup ({
        email:new FormControl(null,[Validators.required,Validators.email])
      })
      verifyCode:FormGroup= new FormGroup ({
        resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{6}$/)])
      })
      resetPassword:FormGroup= new FormGroup ({
        email:new FormControl(null,[Validators.required,Validators.email]),
        newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)])
      })

      verifyEmailSubmit():void{

       let emailValue= this.VerfiyEmail.get('email')?.value
       this.resetPassword.get('email')?.patchValue(emailValue)
        this.isLoading=true;
this.authService.setEmailVerify(this.VerfiyEmail.value).subscribe({
  next:(res)=>{
    console.log(res);
    if(res.statusMsg === "success"){
   this.step=2;
    }
    this.isLoading=false
  },
  error:(err)=>{
console.log(err);
this.isLoading=true
  }
})
      }

      verifyCodeSubmit():void{
        this.isLoading=true
        this.authService.setCodeVerify(this.verifyCode.value).subscribe({
          next:(res)=>{
            console.log(res);
            if(res.status === "Success"){
           this.step=3;
            }
            this.isLoading=false
          },
          error:(err)=>{
        console.log(err);
        this.isLoading=false
          }
        })
              }
              resetPasswordSubmit():void{
                this.isLoading=true
                this.authService.setResetPassword(this.resetPassword.value).subscribe({
                  next:(res)=>{
                    console.log(res);
                    this.isLoading=false;
                  localStorage.setItem('userToken',res.token)
                  this.authService.saveUserData();

                  setTimeout(() => {
                    this.router.navigate(['/home']);
                  }, 500);

                  },
                  error:(err)=>{
                console.log(err);
                this.isLoading=false;

                  }
                })
                      }
}
