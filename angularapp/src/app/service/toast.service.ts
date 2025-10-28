import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private listeners: ((msg: { type: 'success' | 'error' | 'info'; text: string }) => void)[] = [];

  onToast(listener: (msg: { type: 'success' | 'error' | 'info'; text: string }) => void) {
    this.listeners.push(listener);
  }

  offToast(listener: (msg: { type: 'success' | 'error' | 'info'; text: string }) => void) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  show(type: 'success' | 'error' | 'info', text: string) {
    this.listeners.forEach(l => l({ type, text }));
  }
}

