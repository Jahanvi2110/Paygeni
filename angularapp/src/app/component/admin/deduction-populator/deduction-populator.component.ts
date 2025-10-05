import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-deduction-populator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="deduction-populator">
      <h2>🗂️ Deductions Table Population</h2>
      
      <div class="info-section">
        <h3>📋 Deduction Data Overview</h3>
        <ul>
          <li><strong>Employees:</strong> John Smith, Alice Johnson, Mike Davis, Emma Wilson, David Brown</li>
          <li><strong>Months:</strong> Sep 2024, Oct 2024, Nov 2024, Dec 2024</li>
          <li><strong>Types:</strong> TAX (10% salary), PF (3% salary), OTHER (2% salary), INSURANCE (₹800)</li>
          <li><strong>Total Records:</strong> 85 deduction entries</li>
        </ul>
      </div>

      <div class="action-buttons">
        <button 
          class="populate-btn" 
          (click)="populateDeductions()" 
          [disabled]="isLoading">
          <span *ngIf="!isLoading">📥 Populate Deductions Table</span>
          <span *ngIf="isLoading">⏳ Populating...</span>
        </button>
        
        <button 
          class="verify-btn" 
          (click)="verifyDeductions()" 
          [disabled]="isLoading">
          🔍 Verify Data
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

      <div class="deduction-types">
        <h4>📊 Deduction Types Covered:</h4>
        <div class="type-grid">
          <div class="type-card tax">
            <h5>💰 TAX</h5>
            <p>10% of salary</p>
            <span class="status">{{ deductionCounts.tax }} records</span>
          </div>
          <div class="type-card pf">
            <h5>🏢 PF</h5>
            <p>3% of salary</p>
            <span class="status">{{ deductionCounts.pf }} records</span>
          </div>
          <div class="type-card other">
            <h5>📝 OTHER</h5>
            <p>2% of salary</p>
            <span class="status">{{ deductionCounts.other }} records</span>
          </div>
          <div class="type-card insurance">
            <h5>🏥 INSURANCE</h5>
            <p>₹800 annually</p>
            <span class="status">{{ deductionCounts.insurance }} records</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .deduction-populator {
      max-width: 1000px;
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
      font-size: 2rem;
    }

    h3 {
      color: #34495e;
      margin-bottom: 15px;
    }

    h4 {
      color: #34495e;
      margin: 25px 0 15px 0;
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
      background: linear-gradient(135deg, #3498db, #2980b9);
      color: white;
    }

    .populate-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
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

    .type-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-top: 15px;
    }

    .type-card {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      text-align: center;
      transition: transform 0.3s ease;
    }

    .type-card:hover {
      transform: translateY(-5px);
    }

    .type-card h5 {
      margin: 0 0 10px 0;
      font-size: 1.1rem;
    }

    .type-card p {
      margin: 8px 0;
      color: #666;
      font-size: 0.9rem;
    }

    .status {
      display: inline-block;
      padding: 4px 8px;
      background-color: #3498db;
      color: white;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: bold;
    }

    .type-card.tax { border-top: 4px solid #e74c3c; }
    .type-card.pf { border-top: 4px solid #f39c12; }
    .type-card.other { border-top: 4px solid #9b59b6; }
    .type-card.insurance { border-top: 4px solid #1abc9c; }
  `]
})
export class DeductionPopulatorComponent {
  
  isLoading = false;
  resultMessage = '';
  resultType = 'success';
  resultDetails: any = null;

  // Expected deduction counts
  deductionCounts = {
    tax: 20,      // 5 employees × 4 months
    pf: 20,       // 5 employees × 4 months  
    other: 20,    // 5 employees × 4 months
    insurance: 5   // 5 employees × 1 December
  };

  constructor(private http: HttpClient) {}

  populateDeductions() {
    this.isLoading = true;
    this.resultMessage = '';
    this.resultDetails = null;

    this.http.post('http://localhost:9090/api/admin/deductions/populate-sample-data', {})
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.resultMessage = response.message || 'Deductions populated successfully!';
          this.resultType = response.success ? 'success' : 'error';
          this.resultDetails = response;
          
          if (response.success) {
            console.log('✅ Deductions populated successfully:', response);
          } else {
            console.error('❌ Failed to populate deductions:', response);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.resultMessage = `❌ Error: ${error.message || 'Failed to connect to backend'}`;
          this.resultType = 'error';
          this.resultDetails = error;
          console.error('❌ Backend error:', error);
        }
      });
  }

  verifyDeductions() {
    this.isLoading = true;
    this.resultMessage = '';
    this.resultDetails = null;

    this.http.get('http://localhost:9090/api/admin/deductions/statistics')
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.resultMessage = response.message || 'Deduction verification completed!';
          this.resultType = response.success ? 'success' : 'error';
          this.resultDetails = response;
          
          console.log('📊 Deduction statistics:', response);
        },
        error: (error) => {
          this.isLoading = false;
          this.resultMessage = `❌ Error: ${error.message || 'Failed to verify deductions'}`;
          this.resultType = 'error';
          this.resultDetails = error;
          console.error('❌ Verification error:', error);
        }
      });
  }
}
