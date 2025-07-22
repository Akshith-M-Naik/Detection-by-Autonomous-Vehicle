import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { TARGET_CLASSES, DETECTION_THRESHOLDS } from '../utils/detectionConfig';

export class DetectionService {
  constructor() {
    this.model = null;
    this.isInitialized = false;
    this.initializationPromise = null;
  }

  async initialize() {
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = (async () => {
      try {
        this.model = await cocoSsd.load();
        this.isInitialized = true;
        console.log('Model loaded successfully');
      } catch (error) {
        console.error('Error loading model:', error);
        throw error;
      }
    })();

    return this.initializationPromise;
  }

  async detect(video) {
    if (!this.isInitialized) {
      throw new Error('Model not initialized');
    }

    if (!video.videoWidth || !video.videoHeight) {
      throw new Error('Video not ready');
    }

    const predictions = await this.model.detect(video);
    return predictions.filter(prediction => 
      TARGET_CLASSES.includes(prediction.class) && 
      prediction.score >= DETECTION_THRESHOLDS.MINIMUM_CONFIDENCE
    );
  }

  assessRiskLevel(predictions, roadType) {
    const numberOfDetections = predictions.length;
    const highConfidenceDetections = predictions.filter(p => p.score > 0.8).length;
    
    return {
      riskLevel: highConfidenceDetections > 0 ? 'HIGH' : 'LOW',
      detectionCount: numberOfDetections,
      requiresImmediateResponse: highConfidenceDetections > 0
    };
  }
}