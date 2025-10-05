import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseSyncService {

  private baseUrl = 'http://localhost:9090/api/admin/database-sync';

  constructor(private http: HttpClient) { }

  /**
   * Sync database tables to match frontend-backend models
   */
  syncDatabaseTables(): Observable<any> {
    return this.http.post(`${this.baseUrl}/sync-tables`, {});
  }

  /**
   * Populate synced tables with matching data
   */
  populateSyncedData(): Observable<any> {
    return this.http.post(`${this.baseUrl}/populate-synced-data`, {});
  }

  /**
   * Verify database tables match frontend models
   */
  verifySync(): Observable<any> {
    return this.http.get(`${this.baseUrl}/verify-sync`);
  }

  /**
   * Complete sync process: sync tables + populate data
   */
  completeSync(): Observable<any> {
    return new Observable(observer => {
      this.syncDatabaseTables().subscribe({
        next: (syncResponse) => {
          if (syncResponse.success) {
            this.populateSyncedData().subscribe({
              next: (populateResponse) => {
                observer.next({
                  success: true,
                  message: '✅ Complete database sync successful!',
                  sync: syncResponse,
                  populate: populateResponse
                });
                observer.complete();
              },
              error: (error) => {
                observer.error({
                  success: false,
                  message: '❌ Data population failed: ' + error.message,
                  error: error
                });
              }
            });
          } else {
            observer.error({
              success: false,
              message: '❌ Table sync failed: ' + syncResponse.message,
              response: syncResponse
            });
          }
        },
        error: (error) => {
          observer.error({
            success: false,
            message: '❌ Database sync failed: ' + error.message,
            error: error
          });
        }
      });
    });
  }
}
