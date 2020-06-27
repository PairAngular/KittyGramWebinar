import { Observable, Subject, of } from 'rxjs';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnDestroy } from '@angular/core';
import { takeUntil, catchError, filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { auth } from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  destroyed$: Subject<null> = new Subject();
  user$: Observable<firebase.User> = this.authService.user$;

  constructor(
    private readonly authService: AuthService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  login() {
    this.authService
      .login()
      .pipe(
        catchError((error) => of(null)),
        filter((res) => res),
        takeUntil(this.destroyed$)
      )
      .subscribe((authState: auth.UserCredential) => {
        this.snackBar.open('Where are my treats? 😾', 'OK', {
          duration: 4000,
        });
      });
  }

  logout() {
    this.authService
      .logout()
      .pipe(
        catchError((error) => of(null)),
        takeUntil(this.destroyed$)
      )
      .subscribe((authState) => {
        this.snackBar.open('Come back with treats 😿', 'OK', {
          duration: 4000,
        });
        this.router.navigate(['/feed']);
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
