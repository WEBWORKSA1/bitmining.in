/**
 * Types and Interfaces for BitMining.in
 */

export interface LeadSubmission {
  name: string;
  email: string;
  company?: string;
  hashrate: number; // in TH/s or PH/s
  energySource: string;
  location: string;
  message?: string;
}

export interface MiningStats {
  bitcoinPriceUSD: number;
  averageTransactionFeeUSD: number;
  globalHashrateEH: number;
  nextDifficultyAdjustmentDays: number;
  difficultyChangePercent: number;
  indiaGreenHashrateMW: number;
}

export interface ASICModel {
  name: string;
  hashrateTHs: number;
  powerWatts: number;
  efficiencyJTH: number;
  estimatedCostINR: number;
}

export interface YouTubeVideoInfo {
  id: string;
  title: string;
  description: string;
  isCustom: boolean;
  list?: Array<{ id: string; title: string; description: string }>;
}

export interface SponsorshipBenefit {
  title: string;
  stat: string;
  detail: string;
}
