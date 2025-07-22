export class MediaInputService {
  constructor(videoElement) {
    this.videoElement = videoElement;
    this.currentStream = null;
    this.currentInput = null;
  }

  async setupCamera() {
    try {
      this.stopCurrentInput();
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.currentStream = stream;
      this.videoElement.srcObject = stream;
      this.currentInput = 'camera';
      return true;
    } catch (error) {
      console.error('Error accessing camera:', error);
      return false;
    }
  }

  handleVideoFile(file) {
    this.stopCurrentInput();
    const videoURL = URL.createObjectURL(file);
    this.videoElement.src = videoURL;
    this.videoElement.loop = true;
    this.currentInput = 'video';
  }

  handleImageFile(file) {
    this.stopCurrentInput();
    const imageURL = URL.createObjectURL(file);
    this.videoElement.src = imageURL;
    this.videoElement.loop = true;
    this.currentInput = 'image';
  }

  stopCurrentInput() {
    if (this.currentStream) {
      this.currentStream.getTracks().forEach(track => track.stop());
      this.currentStream = null;
    }
    if (this.videoElement.src) {
      URL.revokeObjectURL(this.videoElement.src);
      this.videoElement.src = '';
    }
    this.currentInput = null;
  }

  hasValidInput() {
    return this.currentInput !== null;
  }
}