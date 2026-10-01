export interface ToolkitGroup {
  id: string
  label: string
  items: string[]
}

export const TOOLKIT: ToolkitGroup[] = [
  {
    id: 'software',
    label: 'SOFTWARE',
    items: ['Python', 'C++', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
  },
  {
    id: 'ai-vision',
    label: 'AI / VISION',
    items: ['OpenCV', 'Haar Cascades', 'AI API Integrations', 'Vision Pipelines'],
  },
  {
    id: 'web',
    label: 'WEB',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'Express', 'REST APIs'],
  },
  {
    id: 'data-backend',
    label: 'DATA / BACKEND',
    items: ['MongoDB', 'Mongoose', 'SQLite', 'Authentication'],
  },
  {
    id: 'hardware',
    label: 'HARDWARE',
    items: [
      'ESP32',
      'ESP32-CAM',
      'Arduino Uno / Nano',
      'MPU6050',
      'PCA9685',
      'SG90 Servos',
      'Ultrasonic Sensors',
      'Sensor Interfacing',
    ],
  },
  {
    id: 'tools',
    label: 'TOOLS',
    items: ['Git', 'GitHub', 'Arduino IDE', 'VS Code'],
  },
]
