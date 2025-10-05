import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprehensiveDataService } from '../../../service/comprehensive-data.service';

@Component({
  selector: 'app-comprehensive-data-populator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="data-populator-container">
      <div class="header">
        <h1>📊 Comprehensive Data Population</h1>
        <p>Populate all 7 tables with data based on signup details</p>
      </div>

      <div class="status-section">
        <h2>📈 Current Data Status</h2>
        <div class="status-grid" *ngIf="dataStatus">
          <div class="status-card" *ngFor="let item of statusItems">
            <div class="card-header">
              <h3>{{ item.name }}</h3>
              <span class="count">{{ item.count }}</span>
            </div>
            <div class="card-body">
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
        
        <div class="total-records" *ngIf="dataStatus">
          <h3>Total Records: {{ dataStatus.totalRecords }}</h3>
        </div>
      </div>

      <div class="actions-section">
        <h2>🚀 Actions</h2>
        <div class="action-buttons">
          <button 
            class="btn-primary" 
            (click)="populateAllTables()" 
            [disabled]="isLoading">
            <span *ngIf="isLoading">⏳ Populating...</span>
            <span *ngIf="!isLoading">📊 Populate All Tables</span>
          </button>
          
          <button 
            class="btn-secondary" 
            (click)="refreshStatus()" 
            [disabled]="isLoading">
            🔄 Refresh Status
          </button>
        </div>
      </div>

      <div class="result-section" *ngIf="result">
        <h2>📋 Result</h2>
        <div class="result-card" [class.success]="result.success" [class.error]="!result.success">
          <div class="result-header">
            <span class="icon">{{ result.success ? '✅' : '❌' }}</span>
            <h3>{{ result.success ? 'Success' : 'Error' }}</h3>
          </div>
          <div class="result-body">
            <p>{{ result.message }}</p>
            <div *ngIf="result.usersProcessed" class="details">
              <p><strong>Users Processed:</strong> {{ result.usersProcessed }}</p>
              <p><strong>Tables Populated:</strong></p>
              <ul>
                <li *ngFor="let table of result.tablesPopulated">{{ table }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <h2>ℹ️ Information</h2>
        <div class="info-card">
          <h3>What this does:</h3>
          <ul>
            <li>📝 Creates Employee records from User signups</li>
            <li>💰 Generates Payroll records with calculated salaries</li>
            <li>⏰ Creates Attendance records for the last 30 days</li>
            <li>🏖️ Generates Leave Request records</li>
            <li>💸 Creates Advance Request records</li>
            <li>📊 Populates Salary Components table</li>
            <li>📉 Populates Deductions table</li>
          </ul>
          
          <h3>Data Sources:</h3>
          <p>All data is generated based on the signup details from the <strong>users</strong> table. 
          The system uses role-based calculations for salaries, allowances, and deductions.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .data-populator-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .header {
      text-align: center;
      margin-bottom: 30px;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 10px;
    }

    .header h1 {
      margin: 0 0 10px 0;
      font-size: 2.5em;
    }

    .header p {
      margin: 0;
      font-size: 1.2em;
      opacity: 0.9;
    }

    .status-section, .actions-section, .result-section, .info-section {
      margin-bottom: 30px;
      padding: 20px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .status-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-bottom: 20px;
    }

    .status-card {
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #007bff;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .card-header h3 {
      margin: 0;
      color: #333;
      font-size: 1.1em;
    }

    .count {
      background: #007bff;
      color: white;
      padding: 4px 8px;
      border-radius: 12px;
      font-weight: bold;
      font-size: 0.9em;
    }

    .card-body p {
      margin: 0;
      color: #666;
      font-size: 0.9em;
    }

    .total-records {
      text-align: center;
      padding: 15px;
      background: #e3f2fd;
      border-radius: 8px;
    }

    .total-records h3 {
      margin: 0;
      color: #1976d2;
      font-size: 1.5em;
    }

    .action-buttons {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }

    .btn-primary, .btn-secondary {
      padding: 12px 24px;
      border: none;
      border-radius: 6px;
      font-size: 1em;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: #28a745;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: #218838;
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover:not(:disabled) {
      background: #5a6268;
      transform: translateY(-2px);
    }

    .btn-primary:disabled, .btn-secondary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .result-card {
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid;
    }

    .result-card.success {
      background: #d4edda;
      border-left-color: #28a745;
    }

    .result-card.error {
      background: #f8d7da;
      border-left-color: #dc3545;
    }

    .result-header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
    }

    .result-header .icon {
      font-size: 1.5em;
      margin-right: 10px;
    }

    .result-header h3 {
      margin: 0;
      font-size: 1.3em;
    }

    .result-body p {
      margin: 0 0 10px 0;
      font-size: 1.1em;
    }

    .details {
      margin-top: 15px;
      padding: 15px;
      background: rgba(255,255,255,0.5);
      border-radius: 6px;
    }

    .details p {
      margin: 5px 0;
    }

    .details ul {
      margin: 10px 0;
      padding-left: 20px;
    }

    .info-card {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
    }

    .info-card h3 {
      color: #333;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    .info-card h3:first-child {
      margin-top: 0;
    }

    .info-card ul {
      margin: 10px 0;
      padding-left: 20px;
    }

    .info-card li {
      margin: 5px 0;
      color: #555;
    }

    .info-card p {
      color: #666;
      line-height: 1.6;
    }
  `]
})
export class ComprehensiveDataPopulatorComponent implements OnInit {
  dataStatus: any = null;
  result: any = null;
  isLoading = false;
  statusItems: any[] = [];

  constructor(private comprehensiveDataService: ComprehensiveDataService) {}

  ngOnInit() {
    this.refreshStatus();
  }

  refreshStatus() {
    this.isLoading = true;
    this.comprehensiveDataService.getDataStatus().subscribe({
      next: (status: any) => {
        this.dataStatus = status;
        this.updateStatusItems();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching data status:', error);
        this.isLoading = false;
      }
    });
  }

  populateAllTables() {
    this.isLoading = true;
    this.result = null;
    
    this.comprehensiveDataService.populateAllTablesFromSignups().subscribe({
      next: (result: any) => {
        this.result = result;
        this.isLoading = false;
        // Refresh status after population
        this.refreshStatus();
      },
      error: (error: any) => {
        console.error('Error populating tables:', error);
        this.result = {
          success: false,
          message: 'Failed to populate tables: ' + (error.error?.error || error.message)
        };
        this.isLoading = false;
      }
    });
  }

  private updateStatusItems() {
    if (!this.dataStatus) return;

    this.statusItems = [
      {
        name: 'Users',
        count: this.dataStatus.users,
        description: 'Signed up users'
      },
      {
        name: 'Employees',
        count: this.dataStatus.employees,
        description: 'Employee records'
      },
      {
        name: 'Payrolls',
        count: this.dataStatus.payrolls,
        description: 'Payroll records'
      },
      {
        name: 'Attendance',
        count: this.dataStatus.attendance,
        description: 'Attendance records'
      },
      {
        name: 'Leave Requests',
        count: this.dataStatus.leaveRequests,
        description: 'Leave request records'
      },
      {
        name: 'Advance Requests',
        count: this.dataStatus.advanceRequests,
        description: 'Advance request records'
      },
      {
        name: 'Salary Components',
        count: this.dataStatus.salaryComponents,
        description: 'Salary component records'
      },
      {
        name: 'Deductions',
        count: this.dataStatus.deductions,
        description: 'Deduction records'
      }
    ];
  }
}
