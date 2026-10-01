export interface FieldEntry {
  id: string
  /** Omit if unknown — never guess */
  date?: string
  event: string
  role?: string
  project?: string
  context?: string
  note?: string
}

export const FIELD_LOG: FieldEntry[] = [
  {
    id: 'jecrc-start',
    event: 'Enrolled, B.Tech Computer Science',
    context: 'JECRC University, Jaipur',
    note: 'Batch 2025–2029. Starting at the intersection of software and physical systems.',
  },
  {
    id: 'makerspace',
    event: 'JU Makerspace',
    context: 'JECRC Innovation Ecosystem',
    note: 'Working in the makerspace environment — prototyping hardware, testing ideas, building things that are meant to break.',
  },
  {
    id: 'armbot',
    event: '3-Axis Robotic Armbot',
    project: '3-Ais-ArmBot',
    role: 'Builder',
    note: 'Arduino Uno, three SG90 servos, web-based angle controls. First real hardware project wired from scratch.',
  },
  {
    id: 'face-detection',
    event: 'Face + Eye Detection',
    project: 'Face_eye-detection',
    role: 'Builder',
    note: 'OpenCV + Haar cascades. Real-time detection from webcam. First computer vision experiment.',
  },
  {
    id: 'chatbot',
    event: 'Makerspace AI Chatbot',
    project: 'Makerspace-AI-Chatbot',
    role: 'Builder',
    note: 'A small JavaScript chatbot interface. Building the loop: input → logic → response.',
  },
  {
    id: 'gesture-mouse',
    event: 'Hand Gesture Mouse',
    project: 'Hand_Gesture-Mouse',
    role: 'Builder',
    note: 'MPU6050 + Arduino Nano → serial link → Python cursor control. Physical motion as a computer input.',
  },
  {
    id: 'sajag',
    event: 'SAJAG — Remote Inspection Quadruped',
    project: 'SAJAG',
    role: 'Tech Lead, Team Zenith',
    context: 'Smart India Hackathon / JECRC HackQuest',
    note: 'Quadruped locomotion, ESP32 control, camera, IMU, sensor array, operator dashboard. Biggest hardware build to date.',
  },
  {
    id: 'gyaansetu',
    event: 'GyaanSetu — Learning Platform',
    project: 'GyaanSetu',
    role: 'Builder',
    note: 'Student + mentor dashboards, course flow, reward concept, certificate module. Front end live; backend in progress.',
  },
  {
    id: 'adobe-hackathon',
    event: 'Adobe University Hackathon',
    role: 'Participant',
    note: 'Design and software challenge at the university level.',
  },
  {
    id: 'aarogya-darpan',
    event: 'Aarogya Darpan — Hospital Management Platform',
    project: 'Aarogya-Darpan',
    role: 'Builder',
    context: 'Presented at VishwaNova 2026, MIT-WPU (national-level project competition)',
    note: 'Full-stack Next.js platform: patient management, appointments, records, bed tracking, lab workflows, billing, AI modules.',
  },
]
