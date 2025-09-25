import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

interface Salary {
  id: number;
  employee: string;
  month: string;
  grossSalary: number;
  bonus: number;
  tax: number;
  netPay: number;
}

@Component({
  selector: 'app-salary',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent {
  salaries: Salary[] = [
    { id: 1, employee: 'Alice', month: 'August 2025', grossSalary: 58000, bonus: 5000, tax: 4000, netPay: 59000 },
    { id: 2, employee: 'Bob', month: 'August 2025', grossSalary: 52000, bonus: 4000, tax: 3500, netPay: 52500 },
    { id: 3, employee: 'Charlie', month: 'August 2025', grossSalary: 46000, bonus: 3000, tax: 2500, netPay: 46500 }
  ];

  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
