import { SPEED_LIMITS, DETECTION_THRESHOLDS } from '../utils/detectionConfig';

export class AlertSystem {
  constructor() {
    this.lastAlertTime = 0;
  }

  calculateSafeSpeed(roadType, detections) {
    const baseSpeed = roadType === 'CURVED' ? 
      SPEED_LIMITS.CURVED_ROAD : 
      SPEED_LIMITS.NORMAL_ROAD;

    if (detections.length === 0) return baseSpeed;

    // Reduce speed based on number of detections and their confidence
    const reductionFactor = Math.min(
      detections.length * 0.2 + 
      detections.reduce((acc, det) => acc + det.score, 0) * 0.3,
      0.6
    );

    return Math.max(baseSpeed * (1 - reductionFactor), 20);
  }

  generateAlert(detections, responseTime, roadType) {
    const currentTime = Date.now();
    if (currentTime - this.lastAlertTime < DETECTION_THRESHOLDS.RESPONSE_TIME_THRESHOLD) {
      return null;
    }

    const safeSpeed = this.calculateSafeSpeed(roadType, detections);
    const requiresAlert = responseTime > DETECTION_THRESHOLDS.RESPONSE_TIME_THRESHOLD;

    if (requiresAlert) {
      this.lastAlertTime = currentTime;
      return {
        type: 'WARNING',
        message: `Detected ${detections.length} object(s). Reduce speed to ${safeSpeed} km/h`,
        responseTime,
        recommendedSpeed: safeSpeed
      };
    }

    return null;
  }
}