import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-debug',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; font-family: monospace;">
      <h2>🔧 Debug Information</h2>
      
      <h3>📋 Current Data:</h3>
      <pre>{{ getCurrentData() }}</pre>
      
      <button (click)="clearStorage()" style="background: red; color: white; padding: 10px; border: none; cursor: pointer;">
        🗑️ Clear All Storage
      </button>
      
      <button (click)="showStorage()" style="background: blue; color: white; padding: 10px; border: none; cursor: pointer; margin-left: 10px;">
        📋 Show Storage
      </button>
    </div>
  `
})
export class DebugComponent {
  
  getCurrentData() {
    const currentUser = localStorage.getItem('currentUser');
    const signupData = localStorage.getItem('signupData');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    return JSON.stringify({
      currentUser: currentUser ? JSON.parse(currentUser) : null,
      signupData: signupData ? JSON.parse(signupData) : null,
      isLoggedIn: isLoggedIn
    }, null, 2);
  }
  
  clearStorage() {
    localStorage.clear();
    alert('✅ All storage cleared! Please refresh the page.');
  }
  
  showStorage() {
    console.log('📋 Current localStorage contents:');
    console.log('currentUser:', localStorage.getItem('currentUser'));
    console.log('signupData:', localStorage.getItem('signupData'));
    console.log('isLoggedIn:', localStorage.getItem('isLoggedIn'));
  }
}
