// src/lib/audioCache.ts
class AudioCache {
  private cache: Map<string, Blob> = new Map();
  private maxSize: number;

  constructor(maxSizeMB: number = 50) {
    this.maxSize = maxSizeMB * 1024 * 1024;
  }

  async get(url: string): Promise<Blob | null> {
    return this.cache.get(url) || null;
  }

  async set(url: string, blob: Blob): Promise<void> {
    const currentSize = this.getCurrentSize();
    
    if (currentSize + blob.size > this.maxSize) {
      this.evictOldest();
    }
    
    this.cache.set(url, blob);
  }

  private getCurrentSize(): number {
    let size = 0;
    this.cache.forEach(blob => {
      size += blob.size;
    });
    return size;
  }

  private evictOldest(): void {
    const firstKey = this.cache.keys().next().value;
    if (firstKey) {
      this.cache.delete(firstKey);
    }
  }

  clear(): void {
    this.cache.clear();
  }
}

export const audioCache = new AudioCache();
