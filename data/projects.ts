export type ProjectStatus = 'PROTOTYPE' | 'LIVE DEMO' | 'IN PROGRESS' | 'EXPERIMENT'
export type ProjectTier = 1 | 2 | 3

export interface BuildMode {
  input: string
  processor: string
  output: string
}

export interface CaseStudySection {
  slug: string
}

export interface Project {
  id: string
  number: string
  tier: ProjectTier
  name: string
  tagline: string
  description: string
  category: string[]
  stack: string[]
  status: ProjectStatus
  repoUrl?: string
  liveUrl?: string
  caseStudy?: CaseStudySection
  buildMode: BuildMode
  visual?: string // type hint for which visual component to render
}

export const PROJECTS: Project[] = [
  {
    id: 'sajag',
    number: '01',
    tier: 1,
    name: 'SAJAG',
    tagline: 'Remote railway security inspection quadruped.',
    description:
      'A proof-of-concept quadruped robot built for remote security inspection of hazardous or suspicious areas. Combines quadruped locomotion, a camera feed, environmental sensing, obstacle awareness, orientation data and an operator dashboard — so personnel can assess a situation without being on site. Built for Smart India Hackathon / JECRC HackQuest with Team Zenith.',
    category: ['ROBOTICS', 'EMBEDDED', 'SENSOR SYSTEMS'],
    stack: [
      'ESP32',
      'ESP32-CAM',
      'PCA9685',
      'SG90 Servos',
      'MPU6050',
      'Ultrasonic Sensors',
      'MQ-Series Sensors',
      'C++ (Arduino)',
      'WebSocket',
    ],
    status: 'PROTOTYPE',
    caseStudy: { slug: 'sajag' },
    buildMode: {
      input: 'Camera feed + IMU orientation + vapour / gas anomaly + ultrasonic distance',
      processor: 'ESP32 (locomotion + sensor fusion + wireless control)',
      output: 'Quadruped motion + remote telemetry + operator interface',
    },
    visual: 'sajag-schematic',
  },
  {
    id: 'aarogya-darpan',
    number: '02',
    tier: 1,
    name: 'AAROGYA DARPAN',
    tagline: 'AI-powered digital hospital management platform.',
    description:
      'A full-stack Next.js platform covering patient management, appointments, digital medical records, bed tracking, lab workflows, billing and role-specific portals. Includes an AI symptom checker and AI health assistant module. Presented at VishwaNova 2026 (national-level project competition, MIT-WPU). A software prototype — not a certified medical product.',
    category: ['FULL STACK', 'HEALTHCARE', 'AI'],
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'NextAuth',
      'MongoDB',
      'Mongoose',
      'OpenAI API',
      'Zod',
      'Recharts',
    ],
    status: 'LIVE DEMO',
    repoUrl: 'https://github.com/Bhavya-0801/Aarogya-Darpan',
    liveUrl: 'https://aarogya-darpan.vercel.app',
    caseStudy: { slug: 'aarogya-darpan' },
    buildMode: {
      input: 'Hospital data (patients, appointments, lab orders, billing events)',
      processor: 'Next.js application + AI module + MongoDB',
      output: 'Clinical and administrative workflows, dashboards, AI-assisted insights',
    },
    visual: 'aarogya-architecture',
  },
  {
    id: 'gyaansetu',
    number: '03',
    tier: 2,
    name: 'GYAANSETU',
    tagline: 'Learning platform for students and mentors.',
    description:
      'Multi-page web platform with student and mentor dashboards, course flow, lecture progression, a coin / reward concept, certificate generation and a mentor-connect module. Front end is live. Backend architecture and reward systems are documented and in progress.',
    category: ['EDTECH', 'FULL STACK', 'PRODUCT DESIGN'],
    stack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'SQLite'],
    status: 'IN PROGRESS',
    repoUrl: 'https://github.com/Bhavya-0801/GyaanSetu',
    liveUrl: 'https://gyaan-setu-one.vercel.app/',
    buildMode: {
      input: 'Learner activity (course progress, quiz completion, mentor sessions)',
      processor: 'Web app + backend (Node/Express, SQLite)',
      output: 'Progress tracking, reward coins, certificates',
    },
    visual: 'gyaansetu-progress',
  },
  {
    id: 'hand-gesture-mouse',
    number: '04',
    tier: 3,
    name: 'HAND GESTURE MOUSE',
    tagline: 'Physical motion → digital cursor.',
    description:
      'MPU6050 accelerometer on an Arduino Nano reads hand tilt and sends data over serial. A Python script (PySerial + Pynput) translates the incoming values into cursor movement and click events. Touch-free human–computer interaction from a wrist sensor.',
    category: ['HCI', 'ARDUINO', 'PYTHON'],
    stack: ['Arduino Nano', 'MPU6050', 'C++ (Arduino)', 'Python', 'PySerial', 'Pynput'],
    status: 'EXPERIMENT',
    repoUrl: 'https://github.com/Bhavya-0801/Hand_Gesture-Mouse',
    buildMode: {
      input: 'MPU6050 accelerometer (hand tilt)',
      processor: 'Arduino Nano (I²C read, serial TX) + Python (data parse)',
      output: 'Mouse cursor movement and click events',
    },
    visual: 'gesture-flow',
  },
  {
    id: 'armbot',
    number: '05',
    tier: 3,
    name: '3-AXIS ARMBOT',
    tagline: 'Web-controlled robotic arm.',
    description:
      'Arduino Uno drives three SG90 servos via PWM. An HTML/CSS/JS browser interface sends angle commands, and the arm moves to the target position in real time. Designed to demonstrate servo control fundamentals and three-axis kinematics.',
    category: ['ROBOTICS', 'ARDUINO', 'WEB CONTROL'],
    stack: ['Arduino Uno', 'SG90 Servos', 'C++ (Arduino)', 'HTML', 'CSS', 'JavaScript'],
    status: 'EXPERIMENT',
    repoUrl: 'https://github.com/Bhavya-0801/3-Ais-ArmBot',
    buildMode: {
      input: 'Browser angle controls (sliders / buttons)',
      processor: 'Arduino Uno (PWM servo driver)',
      output: 'Three servo positions (base, joint 01, joint 02)',
    },
    visual: 'armbot-wireframe',
  },
  {
    id: 'face-eye-detection',
    number: '06',
    tier: 3,
    name: 'FACE + EYE DETECTION',
    tagline: 'Real-time face and eye detection.',
    description:
      'Python script using OpenCV and NumPy reads a live webcam feed and applies Haar cascade classifiers to detect faces and eyes in each frame. Bounding boxes are drawn on detected regions. Detection only — no identification or recognition.',
    category: ['COMPUTER VISION', 'PYTHON'],
    stack: ['Python', 'OpenCV', 'NumPy', 'Haar Cascades'],
    status: 'EXPERIMENT',
    repoUrl: 'https://github.com/Bhavya-0801/Face_eye-detection',
    buildMode: {
      input: 'Webcam frames (live video)',
      processor: 'OpenCV Haar cascade classifiers (face + eye)',
      output: 'Bounding boxes drawn over detected faces and eyes',
    },
    visual: 'detection-frame',
  },
  {
    id: 'makerspace-chatbot',
    number: '07',
    tier: 3,
    name: 'MAKERSPACE AI CHATBOT',
    tagline: 'A small conversational UI experiment.',
    description:
      'A browser-based chatbot interface built with HTML, CSS and JavaScript. Provides a typed conversation loop with a configured response logic. Developed at the JU Makerspace.',
    category: ['AI INTERFACE', 'WEB'],
    stack: ['HTML', 'CSS', 'JavaScript'],
    status: 'EXPERIMENT',
    repoUrl: 'https://github.com/Bhavya-0801/Makerspace-AI-Chatbot',
    buildMode: {
      input: 'User text message',
      processor: 'JavaScript response logic',
      output: 'Chat reply in the browser window',
    },
    visual: 'chat-ui',
  },
]
