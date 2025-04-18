
// Local storage utilities for SolIF app

// Keys for different data types
const STORAGE_KEYS = {
  ANALYSIS: 'solif_analysis',
  CORRECTION: 'solif_correction',
  FERTILIZATION: 'solif_fertilization',
  REPORTS: 'solif_reports',
  SAMPLES: 'solif_samples',
  SETTINGS: 'solif_settings',
};

// Save data to local storage
export function saveData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to local storage:', error);
  }
}

// Get data from local storage
export function getData<T>(key: string): T | null {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting data from local storage:', error);
    return null;
  }
}

// Save soil analysis data
export function saveSoilAnalysis(data: any): void {
  saveData(STORAGE_KEYS.ANALYSIS, data);
}

// Get soil analysis data
export function getSoilAnalysis(): any {
  return getData(STORAGE_KEYS.ANALYSIS);
}

// Save correction recommendations
export function saveCorrection(data: any): void {
  saveData(STORAGE_KEYS.CORRECTION, data);
}

// Get correction recommendations
export function getCorrection(): any {
  return getData(STORAGE_KEYS.CORRECTION);
}

// Save fertilization recommendations
export function saveFertilization(data: any): void {
  saveData(STORAGE_KEYS.FERTILIZATION, data);
}

// Get fertilization recommendations
export function getFertilization(): any {
  return getData(STORAGE_KEYS.FERTILIZATION);
}

// Save reports data
export function saveReports(data: any): void {
  saveData(STORAGE_KEYS.REPORTS, data);
}

// Get reports data
export function getReports(): any {
  return getData(STORAGE_KEYS.REPORTS) || [];
}

// Clear all stored data (for testing or reset)
export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}
