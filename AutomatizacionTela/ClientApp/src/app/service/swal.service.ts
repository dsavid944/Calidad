import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class SwalService {
  showErrorMessage(arg0: string) {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  ShowSwalBasicError(title:string, text:string){
    return Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      confirmButtonColor: 'orange'
    });
  }

  ShowSwalBasicSuccess(title:string, text:string){
    Swal.fire({
      icon: 'success',
      title: title,
      text: text,
      confirmButtonColor: 'orange'
    });
  }

  ShowSwalBasicWarning(title:string, text:string){
    Swal.fire({
      icon: 'warning',
      title: title,
      text: text,
      confirmButtonColor: 'orange'
    });
  }

  ShowSwalSuccessNotConfirm(title:string, text:string){
    Swal.fire({
      //position: 'top-end',
      title: title,
      text: text,
      icon: 'success',
      showConfirmButton: false,
      timer: 1000
    })
  }

  ShowSwalErrorNotConfirm(title:string, text:string){
    Swal.fire({
      //position: 'top-end',
      title: title,
      text: text,
      icon: 'error',
      showConfirmButton: false,
      timer: 1000
    })
  }

  ShowSwalNotConfirm(title:string, text:string){
    Swal.fire({
      //position: 'top-end',
      icon: 'warning',
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 10000
    });
  }
}
