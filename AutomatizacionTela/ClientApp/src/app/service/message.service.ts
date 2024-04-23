import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  

  AlertWarning(text: string){
    Swal.fire({
      title: 'Advertencia',
      text: text,
      icon: 'warning',
      confirmButtonText: 'Ok',
      confirmButtonColor: 'orange'
    })
  }

  AlertSuccess(text: string){
    Swal.fire({
      title: 'Muy bien!',
      text: text,
      icon: 'success',
      confirmButtonText: 'Ok',
      confirmButtonColor: 'blue'
    })
  }

  AlertError(text: string){
    Swal.fire({
      title: 'Error!',
      text: text,
      icon: 'error',
      confirmButtonText: 'Ok',
      confirmButtonColor: 'red'
    })
  }

  AlertQuestions(text: string){
   return Swal.fire({
      /*   title: '', */
        text: text,
        icon: 'question',
        confirmButtonColor: 'green',
        showDenyButton: true,
        denyButtonText: 'No, Cancelar',
        confirmButtonText: 'Si, Proceder',
        denyButtonColor: 'Red'
    }).then((result) => {
        if(result.isConfirmed)
          return true;
        else if(result.isDenied)
          return false;
    })
  }

  AlertSearch(text: string){
    return Swal.fire({
      title: text,
      input: 'text',
      icon: 'question',
      inputAttributes: {
        autocapitalize: 'off',
        typeof: 'number'
      },
      showCancelButton: true,
      confirmButtonText: 'Consultar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) 
        return result.value
      else if(result.isDenied)
        return 'false'
      
    })
  }

  AlertErrors(text: string){
    return Swal.fire({
      icon: 'warning',
      title: text,
    }).then((result) => {
      if (result.isConfirmed) 
      return result.value
    });
  }
  AlertSuccessResp(text: string){
    return Swal.fire({
      icon: 'success',
      title: text,
    }).then((result) => {
      if (result.isConfirmed) 
      return result.value
    });
  }
}
