
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  role?: string;
  year?: string;
  client?: string;
  longDescription?: string;
  challenge?: string;
  approach?: string;
  gallery?: string[];
  projectPlanGallery?: string[];
  problemSolutionGallery?: string[];
  howMightWeGallery?: string[];
  personaGallery?: string[];
  marketResearchGallery?: string[];
  userJourneyMapGallery?: string[];
  storyboardGallery?: string[];
  userFlowGallery?: string[];
  inforArchitectureGallery?: string[];
  lowFiGallery?: string[];
  hiFiGallery?: string[];
  finalDesignGallery?: string[];
  impactGallery?: string[];
  hmwDescription?: string;
  accentColor?: string;




}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export enum Section {
  Hero = 'hero',
  Work = 'work',
  About = 'about',
  Contact = 'contact'
}
