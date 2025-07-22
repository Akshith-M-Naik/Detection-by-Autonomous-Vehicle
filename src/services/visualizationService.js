export class VisualizationService {
  constructor(videoElement) {
    this.videoElement = videoElement;
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.ctx = this.canvas.getContext('2d');
    
    // Insert canvas over video
    this.videoElement.parentElement.appendChild(this.canvas);
    this.videoElement.parentElement.style.position = 'relative';
  }

  drawDetections(predictions) {
    // Match canvas size to video
    this.canvas.width = this.videoElement.offsetWidth;
    this.canvas.height = this.videoElement.offsetHeight;
    
    // Clear previous drawings
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw each detection
    predictions.forEach(prediction => {
      const [x, y, width, height] = prediction.bbox;
      const scale = {
        x: this.canvas.width / this.videoElement.videoWidth,
        y: this.canvas.height / this.videoElement.videoHeight
      };

      // Draw bounding box
      this.ctx.strokeStyle = this.getColorByClass(prediction.class);
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(
        x * scale.x,
        y * scale.y,
        width * scale.x,
        height * scale.y
      );

      // Draw label
      this.ctx.fillStyle = this.ctx.strokeStyle;
      this.ctx.font = '16px Arial';
      this.ctx.fillText(
        `${prediction.class} ${Math.round(prediction.score * 100)}%`,
        x * scale.x,
        y * scale.y - 5
      );
    });
  }

  getColorByClass(className) {
    const colors = {
      person: '#FF0000',
      cat: '#00FF00',
      dog: '#0000FF',
      horse: '#FFA500',
      sheep: '#800080',
      cow: '#008080',
      elephant: '#FFD700',
      bear: '#A52A2A',
      zebra: '#000000'
    };
    return colors[className] || '#FFFFFF';
  }

  updateMetricsDisplay(data) {
    const metricsDiv = document.getElementById('metricsDisplay');
    metricsDiv.innerHTML = `
      <div class="metrics-grid">
        <div class="metric-item">
          <h3>Detection Metrics</h3>
          <p>Detection Time: ${data.detectionTime.toFixed(2)}ms</p>
          <p>Response Time: ${data.responseTime.toFixed(2)}ms</p>
          <p>Objects Detected: ${data.predictions.length}</p>
        </div>
        <div class="metric-item">
          <h3>Road Conditions</h3>
          <p>Road Type: ${data.roadType}</p>
          <p>Recommended Speed: ${data.recommendedSpeed ? data.recommendedSpeed + ' km/h' : 'N/A'}</p>
        </div>
        <div class="metric-item">
          <h3>Detected Objects</h3>
          ${this.generateDetectionsList(data.predictions)}
        </div>
      </div>
    `;
  }

  generateDetectionsList(predictions) {
    if (predictions.length === 0) return '<p>No objects detected</p>';
    
    return `<ul>${predictions
      .map(pred => `<li>${pred.class} (${(pred.score * 100).toFixed(1)}% confidence)</li>`)
      .join('')}</ul>`;
  }
}