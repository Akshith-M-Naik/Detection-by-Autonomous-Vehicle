import { MediaInputService } from './services/mediaInputService';
import { DetectionController } from './controllers/detectionController';

const video = document.getElementById('videoInput');
const mediaInput = new MediaInputService(video);
const detectionController = new DetectionController(video);

function setupInputHandlers() {
  const videoFile = document.getElementById('videoFile');
  const imageFile = document.getElementById('imageFile');
  const cameraButton = document.getElementById('cameraButton');
  const startButton = document.getElementById('startButton');
  const stopButton = document.getElementById('stopButton');

  videoFile.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      mediaInput.handleVideoFile(e.target.files[0]);
      updateButtonStates();
    }
  });

  imageFile.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      mediaInput.handleImageFile(e.target.files[0]);
      updateButtonStates();
    }
  });

  cameraButton.addEventListener('click', async () => {
    await mediaInput.setupCamera();
    updateButtonStates();
  });

  startButton.addEventListener('click', async () => {
    if (mediaInput.hasValidInput()) {
      try {
        await detectionController.start();
        updateButtonStates(true);
      } catch (error) {
        console.error('Failed to start detection:', error);
        updateButtonStates(false);
      }
    }
  });

  stopButton.addEventListener('click', () => {
    detectionController.stop();
    updateButtonStates(false);
  });
}

function updateButtonStates(isRunning = false) {
  const startButton = document.getElementById('startButton');
  const stopButton = document.getElementById('stopButton');
  
  startButton.disabled = !mediaInput.hasValidInput() || isRunning;
  stopButton.disabled = !isRunning;
}

// Initialize the application
setupInputHandlers();
updateButtonStates();