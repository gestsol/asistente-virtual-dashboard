import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import Swal from 'sweetalert2'


@Injectable()
export class AuthGuard implements CanActivate {

  
  constructor(private router: Router,) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const userToken =  localStorage.getItem('token');
    /* console.log(user) */

    if (userToken != null) {

      
      return true;

    } else {
      
      this.router.navigate(['/auth/signin']);

        Swal.fire({
         icon: 'warning',
         title: 'Debes Iniciar Sesión',
         text: 'Ingresa los datos de usuario para acceder' })

      return false;
    }
  }

}