import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { JwtUser } from '../../models/jwt-user.model';
import { AuthService } from '../../services/auth.service';
import { BalanceService } from '../../services/balance.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: JwtUser;
  balance: number;

  private userSubscription: Subscription;
  private balanceSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private balanceService: BalanceService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.jwtUser$.subscribe((jwtUser) => {
      this.user = jwtUser;
    });

    this.balanceSubscription = this.balanceService.balance$.subscribe(
      (balance) => {
        this.balance = balance;
      }
    );
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.balanceSubscription?.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth', 'login']);
  }
}
