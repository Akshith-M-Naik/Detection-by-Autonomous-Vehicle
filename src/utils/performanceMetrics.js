export class PerformanceMetrics {
  constructor() {
    this.detectionTimes = [];
    this.responseTimes = [];
  }

  startDetection() {
    return performance.now();
  }

  endDetection(startTime) {
    const endTime = performance.now();
    const detectionTime = endTime - startTime;
    this.detectionTimes.push(detectionTime);
    return detectionTime;
  }

  getAverageDetectionTime() {
    if (this.detectionTimes.length === 0) return 0;
    return this.detectionTimes.reduce((a, b) => a + b) / this.detectionTimes.length;
  }

  calculateResponseTime(detectionTime, isHighRisk) {
    // Add processing and alert system delay
    const processingDelay = isHighRisk ? 50 : 100;
    const responseTime = detectionTime + processingDelay;
    this.responseTimes.push(responseTime);
    return responseTime;
  }
}