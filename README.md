# 🐾 Autonomous Vehicle Guardian: Real-Time Animal and Child Detection System

**An advanced, real-time detection system designed to make our roads safer for their most vulnerable users: children and animals. This project leverages the power of TensorFlow.js to provide immediate visual alerts and safety recommendations for autonomous and human-driven vehicles.**

---

## 🌟 Key Features

- **Real-Time Object Detection**: Utilizes the COCO-SSD model with TensorFlow.js to identify animals and people in real-time from a live camera feed, video, or static image.
- **Dynamic Risk Assessment**: Intelligently assesses the risk level based on the number and confidence of detections, as well as the type of road (normal or curved).
- **Instantaneous Alerts**: Generates immediate, easy-to-understand visual warnings when a potential hazard is detected.
- **Adaptive Speed Recommendations**: Calculates and suggests a safe driving speed based on real-time road conditions and detected objects.
- **Performance Metrics**: Provides a detailed dashboard with key performance indicators like detection time, response time, and a list of all detected objects.
- **Multiple Input Sources**: Seamlessly switch between using a live webcam, pre-recorded video files, or even static images for maximum flexibility.
- **Interactive Visualization**: Overlays bounding boxes and detection confidence scores directly onto the video feed for clear and intuitive feedback.

---

## 🔧 How It Works

The system follows a sophisticated pipeline to ensure rapid and accurate threat detection and response:

1.  **Media Input**: The user can choose to provide input via a live webcam feed, a video file, or an image. The `MediaInputService` handles the streaming and processing of the selected media.

2.  **Object Detection**: The core of the system is the `DetectionService`, which loads the pre-trained COCO-SSD model. For each frame of the input, it detects objects and filters them to a predefined list of target classes (e.g., person, dog, cat).

3.  **Risk Analysis**: The `DetectionController` takes the predictions and, in conjunction with the `AlertSystem`, assesses the risk. It considers factors such as the number of detected objects, their detection confidence, and the road type to determine if an alert is necessary.

4.  **Alert Generation**: If the risk level crosses a certain threshold, the `AlertSystem` generates a warning message. This includes a recommended safe speed, which is dynamically calculated to give the driver or autonomous system enough time to react.

5.  **Visualization and Feedback**: The `VisualizationService` is responsible for the user-facing output. It draws bounding boxes around detected objects on a canvas overlaid on the video feed. It also updates a dashboard with real-time metrics, providing a comprehensive overview of the system's performance.

---

## 🛠️ Technologies Used

This project is built with a modern, browser-based tech stack, making it accessible and easy to run without any complex server-side setup.

-   **Core Frameworks**:
    -   [TensorFlow.js](https://www.tensorflow.org/js): For running machine learning models directly in the browser.
    -   [COCO-SSD Model](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd): A pre-trained object detection model that is fast and accurate.
-   **Development Tools**:
    -   [Vite](https://vitejs.dev/): A next-generation frontend build tool that provides a faster and leaner development experience.
-   **Language**:
    -   **JavaScript (ESM)**: The entire codebase is written in modern, modular JavaScript.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You will need to have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/autonomous-vehicle-guardian.git](https://github.com/your-username/autonomous-vehicle-guardian.git)
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd autonomous-vehicle-guardian
    ```

3.  **Install the NPM packages:**
    ```sh
    npm install
    ```

### Running the Application

Once the dependencies are installed, you can start the development server:

```sh
npm run dev
