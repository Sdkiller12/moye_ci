import type { Ethnie } from '@/types';

let db: any = null;

export function initDB() {
  if (typeof window === 'undefined') return;
  
  try {
    // Try to load better-sqlite3 if available
    const Database = require('better-sqlite3');
    db = new Database('moye-cache.db');
    
    db.exec(`
      CREATE TABLE IF NOT EXISTS ethnies_cache (
        id TEXT PRIMARY KEY,
        data TEXT NOT NULL,
        cached_at INTEGER NOT NULL
      )
    `);
  } catch (error) {
    console.warn('SQLite cache unavailable (optional feature):', error);
    // Cache will use localStorage as fallback
  }
}

export function cacheEthnies(ethnies: Ethnie[]) {
  if (!db) {
    // Fallback to localStorage
    try {
      localStorage.setItem('moye_ethnies_cache', JSON.stringify(ethnies));
    } catch (e) {
      console.warn('Cache storage failed:', e);
    }
    return;
  }
  
  const stmt = db.prepare('INSERT OR REPLACE INTO ethnies_cache (id, data, cached_at) VALUES (?, ?, ?)');
  const now = Date.now();
  
  for (const ethnie of ethnies) {
    stmt.run(ethnie.id, JSON.stringify(ethnie), now);
  }
}

export function getCachedEthnies(): Ethnie[] {
  if (!db) {
    // Fallback to localStorage
    try {
      const cached = localStorage.getItem('moye_ethnies_cache');
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  }
  
  try {
    const rows = db.prepare('SELECT data FROM ethnies_cache').all() as Array<{ data: string }>;
    return rows.map(row => JSON.parse(row.data));
  } catch {
    return [];
  }
}
