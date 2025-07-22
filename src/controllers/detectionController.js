import { DetectionService } from '../services/detectionService';
import { AlertSystem } from '../services/alertSystem';
import { PerformanceMetrics } from '../utils/performanceMetrics';
import { VisualizationService } from '../services/visualizationService';

export class DetectionController {
  constructor(video) {
    this.video = video;
    this.isRunning = false;
    this.metrics = new PerformanceMetrics();
    this.detector = new DetectionService();
    this.alertSystem = new AlertSystem();
    this.visualizer = new VisualizationService(video);
  }

  async start() {
    if (this.isRunning) return;
    
    try {
      await this.detector.initialize();
      this.isRunning = true;
      this.detectFrame();
    } catch (error) {
      console.error('Failed to start detection:', error);
      throw error;
    }
  }

  stop() {
    this.isRunning = false;
  }

  private async detectFrame() {
    if (!this.isRunning) return;

    // Wait for video to be ready
    if (!this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      requestAnimationFrame(() => this.detectFrame());
      return;
    }

    const startTime = this.metrics.startDetection();
    
    try {
      const predictions = await this.detector.detect(this.video);
      const detectionTime = this.metrics.endDetection(startTime);
      
      this.visualizer.drawDetections(predictions);
      
      const roadType = Math.random() > 0.7 ? 'CURVED' : 'NORMAL';
      const riskAssessment = this.detector.assessRiskLevel(predictions, roadType);
      const responseTime = this.metrics.calculateResponseTime(
        detectionTime, 
        riskAssessment.requiresImmediateResponse
      );

      const alert = this.alertSystem.generateAlert(predictions, responseTime, roadType);
      
      if (alert) {
        this.displayAlert(alert);
      }

      this.visualizer.updateMetricsDisplay({
        detectionTime,
        responseTime,
        predictions,
        roadType,
        recommendedSpeed: alert?.recommendedSpeed
      });

    } catch (error) {
      console.error('Detection error:', error);
    }

    if (this.isRunning) {
      requestAnimationFrame(() => this.detectFrame());
    }
  }

  private displayAlert(alert) {
    const alertDisplay = document.getElementById('alertDisplay');
    alertDisplay.innerHTML = `
      <div class="alert warning">
        ${alert.message}
      </div>
    `;
  }
}