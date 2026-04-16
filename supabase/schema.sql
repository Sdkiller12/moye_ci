-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Core entity
CREATE TABLE ethnies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom TEXT NOT NULL,
  region TEXT NOT NULL,
  sous_region TEXT,
  population_approx INTEGER,
  description TEXT,
  histoire TEXT,
  image_url TEXT,
  carte_coords JSONB,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cultural elements
CREATE TABLE rites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ethnie_id UUID REFERENCES ethnies(id) ON DELETE CASCADE,
  nom TEXT NOT NULL,
  type TEXT CHECK (type IN ('fête','initiation','funéraire','royal','quotidien')),
  description TEXT,
  periode TEXT,
  image_url TEXT
);

CREATE TABLE objets_culturels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ethnie_id UUID REFERENCES ethnies(id) ON DELETE CASCADE,
  nom TEXT NOT NULL,
  type TEXT CHECK (type IN ('masque','pagne','instrument','statuette','autre')),
  description TEXT,
  usage_sacre TEXT,
  image_url TEXT,
  gemini_labels TEXT[]
);

CREATE TABLE gastronomie (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ethnie_id UUID REFERENCES ethnies(id) ON DELETE CASCADE,
  nom TEXT NOT NULL,
  ingredients TEXT[],
  recette TEXT,
  image_url TEXT,
  tags TEXT[]
);

-- Language system
CREATE TABLE langues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ethnie_id UUID REFERENCES ethnies(id) ON DELETE CASCADE,
  nom TEXT NOT NULL,
  code TEXT UNIQUE,
  famille TEXT,
  locuteurs_approx INTEGER
);

CREATE TABLE mots_traductions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  langue_id UUID REFERENCES langues(id) ON DELETE CASCADE,
  mot_fr TEXT NOT NULL,
  mot_local TEXT NOT NULL,
  phonetique TEXT,
  audio_url TEXT,
  theme TEXT
);

-- Academy
CREATE TABLE modules_apprentissage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  langue_id UUID REFERENCES langues(id),
  titre TEXT NOT NULL,
  niveau TEXT CHECK (niveau IN ('grain_de_sable','palmier','baobab')),
  ordre INTEGER,
  xp_reward INTEGER DEFAULT 10
);

CREATE TABLE questions_quiz (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID REFERENCES modules_apprentissage(id),
  type TEXT CHECK (type IN ('traduction','histoire','image','audio')),
  enonce TEXT NOT NULL,
  options JSONB,
  reponse_correcte TEXT NOT NULL,
  explication TEXT
);

-- User progress
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  module_id UUID REFERENCES modules_apprentissage(id),
  score INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ
);

CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  badge_slug TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  content TEXT NOT NULL,
  langue_source TEXT,
  content_translated JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE ethnies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON ethnies FOR SELECT USING (true);

ALTER TABLE rites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read rites" ON rites FOR SELECT USING (true);

ALTER TABLE objets_culturels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read objets" ON objets_culturels FOR SELECT USING (true);

ALTER TABLE gastronomie ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read gastro" ON gastronomie FOR SELECT USING (true);

ALTER TABLE langues ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read langues" ON langues FOR SELECT USING (true);

ALTER TABLE mots_traductions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read mots" ON mots_traductions FOR SELECT USING (true);

ALTER TABLE modules_apprentissage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read modules" ON modules_apprentissage FOR SELECT USING (true);

ALTER TABLE questions_quiz ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read questions" ON questions_quiz FOR SELECT USING (true);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own progress" ON user_progress USING (auth.uid() = user_id);

ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own badges" ON user_badges USING (auth.uid() = user_id);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read messages" ON chat_messages FOR SELECT USING (true);
CREATE POLICY "authenticated insert messages" ON chat_messages FOR INSERT WITH CHECK (auth.uid() = user_id);
