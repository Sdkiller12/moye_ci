export interface Ethnie {
  id: string;
  nom: string;
  region: string;
  sous_region?: string;
  population_approx?: number;
  description?: string;
  histoire?: string;
  image_url?: string;
  carte_coords?: { lat: number; lng: number; bounds?: number[][] };
  tags?: string[];
  created_at?: string;
}

export interface Rite {
  id: string;
  ethnie_id: string;
  nom: string;
  type: 'fête' | 'initiation' | 'funéraire' | 'royal' | 'quotidien';
  description?: string;
  periode?: string;
  image_url?: string;
}

export interface ObjetCulturel {
  id: string;
  ethnie_id: string;
  nom: string;
  type: 'masque' | 'pagne' | 'instrument' | 'statuette' | 'autre';
  description?: string;
  usage_sacre?: string;
  image_url?: string;
  gemini_labels?: string[];
}

export interface Gastronomie {
  id: string;
  ethnie_id: string;
  nom: string;
  ingredients?: string[];
  recette?: string;
  image_url?: string;
  tags?: string[];
}

export interface Langue {
  id: string;
  ethnie_id: string;
  nom: string;
  code: string;
  famille?: string;
  locuteurs_approx?: number;
}

export interface MotTraduction {
  id: string;
  langue_id: string;
  mot_fr: string;
  mot_local: string;
  phonetique?: string;
  audio_url?: string;
  theme?: string;
}

export interface ModuleApprentissage {
  id: string;
  langue_id?: string;
  titre: string;
  niveau: 'grain_de_sable' | 'palmier' | 'baobab';
  ordre: number;
  xp_reward: number;
}

export interface QuestionQuiz {
  id: string;
  module_id: string;
  type: 'traduction' | 'histoire' | 'image' | 'audio';
  enonce: string;
  options?: string[];
  reponse_correcte: string;
  explication?: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  module_id: string;
  score: number;
  completed: boolean;
  completed_at?: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_slug: string;
  unlocked_at: string;
}

export interface ChatMessage {
  id: string;
  room_id: string;
  user_id: string;
  content: string;
  langue_source?: string;
  content_translated?: Record<string, string>;
  created_at: string;
}

export interface ScanResult {
  type_objet: string;
  nom_probable: string;
  ethnie_probable: string;
  description_courte: string;
  usage_culturel: string;
  confiance: number;
}

export interface AppState {
  currentTab: string;
  user: any | null;
  totalXP: number;
  preferredLanguage: string;
  setCurrentTab: (tab: string) => void;
  setUser: (user: any) => void;
  addXP: (amount: number) => void;
  setPreferredLanguage: (lang: string) => void;
}
