// API Service Utilities

export const LATENCY = 600; // simulated server latency in ms

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
