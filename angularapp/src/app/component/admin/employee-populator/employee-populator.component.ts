import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-employee-populator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="employee-populator">
      <h2>👥 Employee Database Population</h2>
      
      <div class="info-section">
        <h3>📋 Employee Data Overview</h3>
        <ul>
          <li><strong>Total Employees:</strong> 10 employees across different departments</li>
          <li><strong>Departments:</strong> Engineering, HR, Finance, Admin, QA, DevOps, Marketing, Business, Sales</li>
          <li><strong>Salary Range:</strong> ₹20,000 - ₹30,000</li>
          <li><strong>Locations:</strong> Bangalore, Mumbai, Chennai, Delhi, Kolkata, Pune, Hyderabad, Ahmedabad, Kochi, Indore</li>
          <li><strong>Status:</strong> All employees are ACTIVE</li>
        </ul>
      </div>

      <div class="action-buttons">
        <button 
          class="populate-btn" 
          (click)="populateEmployees()" 
          [disabled]="isLoading">
          <span *ngIf="!isLoading">👥 Populate Employee Table</span>
          <span *ngIf="isLoading">⏳ Populating...</span>
        </button>
        
        <button 
          class="verify-btn" 
          (click)="verifyEmployees()" 
          [disabled]="isLoading">
          🔍 Verify Employee Data
        </button>
      </div>

      <div class="result-section" *ngIf="resultMessage">
        <div class="result" [ngClass]="resultType">
          {{ resultMessage }}
        </div>
        <div class="details" *ngIf="resultDetails">
          <pre>{{ resultDetails | json }}</pre>
        </div>
      </div>

      <div class="employee-grid">
        <h4>👥 Current Employees (from signups):</h4>
        <div class="employee-cards" *ngIf="!isLoading && employees.length > 0">
          <div *ngFor="let employee of employees" class="employee-card" [class.admin-card]="employee.role === 'ADMIN'">
            <div class="employee-avatar">{{ employee.firstName.charAt(0) }}</div>
            <h5>{{ employee.firstName }}</h5>
            <p>{{ employee.role === 'ADMIN' ? 'Administrator' : 'Employee' }}</p>
            <p>{{ employee.email }}</p>
            <span class="status" [class.admin-status]="employee.role === 'ADMIN'">{{ employee.role }}</span>
          </div>
        </div>
        <div *ngIf="isLoading" class="loading-message">Loading employees...</div>
        <div *ngIf="!isLoading && employees.length === 0" class="empty-message">No employees found. Sign up some users first!</div>
      </div>

      <div class="sql-section">
        <h4>💡 Alternative Methods:</h4>
        <div class="method-cards">
          <div class="method-card">
            <h5>📁 SQL Script</h5>
            <p>Run the SQL script directly in MySQL:</p>
            <code>source populate-employees.sql</code>
          </div>
          
          <div class="method-card">
            <h5>🌐 REST API</h5>
            <p>Call the Spring Boot endpoint:</p>
            <code>POST /api/admin/database-sync/populate-synced-data</code>
          </div>
          
          <div class="method-card">
            <h5>💻 Angular Interface</h5>
            <p>Use this button above to populate via frontend</p>
            <code>Auto-populated on click</code>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .employee-populator {
      max-width: 1200px;
      margin: 20px auto;
      padding: 20px;
      background-color: #f8f9fa;
      border-radius: 10px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    h2 {
      color: #2c3e50;
      text-align: center;
      margin-bottom: 30px;
      font-size: 2.2rem;
    }

    h3, h4 {
      color: #34495e;
      margin-bottom: 15px;
    }

    .info-section {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .info-section ul {
      list-style-type: none;
      padding: 0;
    }

    .info-section li {
      margin: 8px 0;
      padding: 8px;
      background-color: #ecf0f1;
      border-radius: 4px;
    }

    .action-buttons {
      text-align: center;
      margin: 30px 0;
    }

    .populate-btn, .verify-btn {
      padding: 15px 30px;
      margin: 0 10px;
      border: none;
      border-radius: 25px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .populate-btn {
      background: linear-gradient(135deg, #e67e22, #d35400);
      color: white;
    }

    .populate-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(230, 126, 34, 0.4);
    }

    .verify-btn {
      background: linear-gradient(135deg, #27ae60, #229954);
      color: white;
    }

    .verify-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(39, 174, 96, 0.4);
    }

    .populate-btn:disabled, .verify-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .result-section {
      margin: 20px 0;
    }

    .result {
      padding: 15px;
      border-radius: 8px;
      font-weight: bold;
      text-align: center;
    }

    .result.success {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .result.error {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    .details {
      margin-top: 10px;
      background: white;
      padding: 15px;
      border-radius: 8px;
      overflow-x: auto;
    }

    .employee-grid {
      margin: 30px 0;
    }

    .employee-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .employee-card {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      text-align: center;
      transition: transform 0.3s ease;
    }

    .employee-card:hover {
      transform: translateY(-5px);
    }

    .employee-avatar {
      font-size: 2rem;
      margin-bottom: 10px;
    }

    .employee-card h5 {
      margin: 10px 0 5px 0;
      color: #2c3e50;
    }

    .employee-card p {
      margin: 5px 0;
      color: #666;
      font-size: 0.9rem;
    }

    .status {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: bold;
      margin-top: 10px;
    }

    .status.active {
      background-color: #27ae60;
      color: white;
    }

    .status.manager {
      background-color: #f39c12;
      color: white;
    }

    .status.admin-status {
      background-color: #e74c3c;
      color: white;
    }

    .loading-message, .empty-message {
      text-align: center;
      padding: 20px;
      color: #666;
      font-style: italic;
    }

    .employee-card.admin-card {
      border-top: 4px solid #e74c3c;
      background: linear-gradient(135deg, #ffebee 0%, #ffffff 100%);
    }

    .employee-card.engineering { border-top: 4px solid #3498db; }
    .employee-card.hr { border-top: 4px solid #e67e22; }
    .employee-card.finance { border-top: 4px solid #9b59b6; }
    .employee-card.admin { border-top: 4px solid #95a5a6; }

    .sql-section {
      margin-top: 30px;
    }

    .method-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 15px;
      margin-top: 15px;
    }

    .method-card {
      background: white;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba（0,0,0,0.1);
    }

    .method-card h5 {
      margin: 0 0 10px 0;
      color: #2c3e50;
    }

    .method-card p {
      margin: 8px 0;
      color: #666;
      font-size: 0.9rem;
    }

    .method-card code {
      background-color: #ecf0f1;
      padding: 5px 8px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 0.85rem;
      color: #2c3e50;
    }
  `]
})
export class EmployeePopulatorComponent implements OnInit {
  
  isLoading = false;
  resultMessage = '';
  resultType = 'success';
  resultDetails: any = null;
  employees: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadEmployees();
  }

  private loadEmployees() {
    this.isLoading = true;
    this.http.get<any[]>(`${environment.apiUrl}/auth/users`)
      .subscribe({
        next: (users) => {
          this.employees = users;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading employees:', error);
          this.isLoading = false;
        }
      });
  }

  populateEmployees() {
    this.isLoading = true;
    this.resultMessage = '';
    this.resultDetails = null;

    this.http.post('http://localhost:9090/api/admin/database-sync/populate-synced-data', {})
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.resultMessage = response.message || 'Employees populated successfully!';
          this.resultType = response.success ? 'success' : 'error';
          this.resultDetails = response;
          
          if (response.success) {
            console.log('✅ Employees populated successfully:', response);
          } else {
            console.error('❌ Failed to populate employees:', response);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.resultMessage = `❌ Error: ${error.message || 'Failed to connect to backend. Make sure Spring Boot is running on port 9090.'}`;
          this.resultType = 'error';
          this.resultDetails = error;
          console.error('❌ Backend error:', error);
        }
      });
  }

  verifyEmployees() {
    this.isLoading = true;
    this.resultMessage = '';
    this.resultDetails = null;

    this.http.get('http://localhost:9090/api/admin/database-sync/verify-sync')
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.resultMessage = response.message || 'Employee verification completed!';
          this.resultType = response.success ? 'success' : 'error';
          this.resultDetails = response;
          
          console.log('📊 Employee verification:', response);
        },
        error: (error) => {
          this.isLoading = false;
          this.resultMessage = `❌ Error: ${error.message || 'Failed to verify employees'}`;
          this.resultType = 'error';
          this.resultDetails = error;
          console.error('❌ Verification error:', error);
        }
      });
  }
}
