-- Seed data for MOYÉ platform
-- 5 ethnies with cultural data

-- 1. AGNI (SANWI)
INSERT INTO ethnies (nom, region, sous_region, population_approx, description, histoire, carte_coords, tags)
VALUES (
  'Agni',
  'Est',
  'Sanwi',
  1200000,
  'Le peuple Agni, originaire du Ghana, s''est installé dans l''Est de la Côte d''Ivoire au XVIIIe siècle. Ils sont connus pour leur royaume du Sanwi et leur riche tradition royale.',
  'Les Agni ont fondé le royaume du Sanwi avec Aboisso comme capitale. Leur migration depuis le Ghana a été motivée par des conflits dynastiques. Ils ont développé une société hiérarchisée avec un roi puissant.',
  '{"lat": 5.4667, "lng": -3.2000}',
  ARRAY['akan', 'royaume', 'est', 'sanwi']
);

-- Langue Agni
INSERT INTO langues (ethnie_id, nom, code, famille, locuteurs_approx)
SELECT id, 'Agni', 'any', 'kwa', 1200000 FROM ethnies WHERE nom = 'Agni';

-- Mots Agni
INSERT INTO mots_traductions (langue_id, mot_fr, mot_local, phonetique, theme)
SELECT l.id, 'Bonjour', 'Ano', 'a-no', 'salutations'
FROM langues l JOIN ethnies e ON l.ethnie_id = e.id WHERE e.nom = 'Agni';

INSERT INTO mots_traductions (langue_id, mot_fr, mot_local, phonetique, theme)
SELECT l.id, 'Merci', 'Akwaba', 'a-kwa-ba', 'salutations'
FROM langues l JOIN ethnies e ON l.ethnie_id = e.id WHERE e.nom = 'Agni';

-- Rites Agni
INSERT INTO rites (ethnie_id, nom, type, description, periode)
SELECT id, 'Fête de l''Igname', 'fête', 'Célébration annuelle de la nouvelle récolte d''igname, symbole de prospérité', 'Septembre'
FROM ethnies WHERE nom = 'Agni';

INSERT INTO rites (ethnie_id, nom, type, description)
SELECT id, 'Intronisation royale', 'royal', 'Cérémonie sacrée d''investiture du nouveau roi du Sanwi'
FROM ethnies WHERE nom = 'Agni';

-- Objets culturels Agni
INSERT INTO objets_culturels (ethnie_id, nom, type, description, usage_sacre)
SELECT id, 'Masque Adjuanon', 'masque', 'Masque sacré utilisé lors des cérémonies royales', 'Réservé aux cérémonies d''intronisation'
FROM ethnies WHERE nom = 'Agni';

-- Gastronomie Agni
INSERT INTO gastronomie (ethnie_id, nom, ingredients, recette, tags)
SELECT id, 'Foutou banane', ARRAY['banane plantain', 'eau'], 'Piler la banane plantain cuite jusqu''à obtenir une pâte lisse', ARRAY['plat principal', 'traditionnel']
FROM ethnies WHERE nom = 'Agni';

-- 2. N'ZIMA (KRINDJABO)
INSERT INTO ethnies (nom, region, sous_region, population_approx, description, histoire, carte_coords, tags)
VALUES (
  'N''Zima',
  'Sud-Est',
  'Krindjabo',
  800000,
  'Les N''Zima sont célèbres pour la fête de l''Abissa, une des plus grandes manifestations culturelles de Côte d''Ivoire. Leur royaume de Krindjabo est l''un des plus anciens du pays.',
  'Le royaume N''Zima de Krindjabo a été fondé au XVIe siècle. La fête de l''Abissa, célébrée chaque année, permet au peuple de critiquer librement les autorités pendant une semaine.',
  '{"lat": 5.1333, "lng": -3.2500}',
  ARRAY['akan', 'royaume', 'abissa', 'sud-est']
);

-- Langue N'Zima
INSERT INTO langues (ethnie_id, nom, code, famille, locuteurs_approx)
SELECT id, 'N''Zima', 'nzi', 'kwa', 800000 FROM ethnies WHERE nom = 'N''Zima';

-- Rites N'Zima
INSERT INTO rites (ethnie_id, nom, type, description, periode)
SELECT id, 'Abissa', 'fête', 'Grande fête de purification et de liberté d''expression où tout peut être dit', 'Octobre-Novembre'
FROM ethnies WHERE nom = 'N''Zima';

-- Gastronomie N'Zima
INSERT INTO gastronomie (ethnie_id, nom, ingredients, recette, tags)
SELECT id, 'Attiéké poisson', ARRAY['manioc fermenté', 'poisson braisé', 'tomate', 'oignon'], 'Servir l''attiéké avec le poisson grillé et la sauce tomate-oignon', ARRAY['plat principal', 'populaire']
FROM ethnies WHERE nom = 'N''Zima';

-- 3. BAOULÉ
INSERT INTO ethnies (nom, region, population_approx, description, histoire, carte_coords, tags)
VALUES (
  'Baoulé',
  'Centre',
  4000000,
  'Le peuple Baoulé est le plus nombreux de Côte d''Ivoire. Leur histoire est marquée par la légende de la reine Abla Pokou qui sacrifia son fils pour sauver son peuple.',
  'Au XVIIIe siècle, la reine Abla Pokou fuit le royaume Ashanti avec son peuple. Pour traverser le fleuve Comoé, elle sacrifia son fils unique. Le peuple prit alors le nom de "Ba-oulé" (l''enfant est mort).',
  '{"lat": 7.6833, "lng": -5.0333}',
  ARRAY['akan', 'centre', 'agriculture', 'reine-pokou']
);

-- Langue Baoulé
INSERT INTO langues (ethnie_id, nom, code, famille, locuteurs_approx)
SELECT id, 'Baoulé', 'bci', 'kwa', 4000000 FROM ethnies WHERE nom = 'Baoulé';

-- Mots Baoulé
INSERT INTO mots_traductions (langue_id, mot_fr, mot_local, phonetique, theme)
SELECT l.id, 'Bonjour', 'N''da', 'n-da', 'salutations'
FROM langues l JOIN ethnies e ON l.ethnie_id = e.id WHERE e.nom = 'Baoulé';

-- Rites Baoulé
INSERT INTO rites (ethnie_id, nom, type, description)
SELECT id, 'Danse du Goli', 'fête', 'Danse masquée sacrée représentant les esprits de la forêt'
FROM ethnies WHERE nom = 'Baoulé';

-- Objets culturels Baoulé
INSERT INTO objets_culturels (ethnie_id, nom, type, description)
SELECT id, 'Masque Goli', 'masque', 'Masque circulaire représentant le soleil, utilisé lors des cérémonies'
FROM ethnies WHERE nom = 'Baoulé';

-- Gastronomie Baoulé
INSERT INTO gastronomie (ethnie_id, nom, ingredients, recette, tags)
SELECT id, 'Sauce graine', ARRAY['noix de palme', 'viande', 'poisson fumé', 'aubergine'], 'Cuire les noix de palme, extraire l''huile rouge, ajouter viande et légumes', ARRAY['sauce', 'traditionnel']
FROM ethnies WHERE nom = 'Baoulé';

-- 4. BÉTÉ
INSERT INTO ethnies (nom, region, population_approx, description, histoire, carte_coords, tags)
VALUES (
  'Bété',
  'Ouest',
  1500000,
  'Les Bété sont célèbres pour le masque Zaouli, considéré comme l''un des plus beaux masques d''Afrique. Ils vivent principalement dans la région forestière de l''Ouest.',
  'Peuple de la forêt, les Bété ont développé une culture riche en masques et danses. Le Zaouli est né dans les années 1950 et est devenu patrimoine culturel immatériel de l''UNESCO.',
  '{"lat": 6.7333, "lng": -6.5667}',
  ARRAY['kru', 'ouest', 'forêt', 'zaouli']
);

-- Langue Bété
INSERT INTO langues (ethnie_id, nom, code, famille, locuteurs_approx)
SELECT id, 'Bété', 'bte', 'kru', 1500000 FROM ethnies WHERE nom = 'Bété';

-- Rites Bété
INSERT INTO rites (ethnie_id, nom, type, description)
SELECT id, 'Danse du Zaouli', 'fête', 'Danse masquée spectaculaire avec des mouvements acrobatiques rapides'
FROM ethnies WHERE nom = 'Bété';

-- Objets culturels Bété
INSERT INTO objets_culturels (ethnie_id, nom, type, description, usage_sacre)
SELECT id, 'Masque Zaouli', 'masque', 'Masque coloré aux motifs géométriques, patrimoine UNESCO', 'Utilisé lors des cérémonies de réjouissance'
FROM ethnies WHERE nom = 'Bété';

-- Gastronomie Bété
INSERT INTO gastronomie (ethnie_id, nom, ingredients, recette, tags)
SELECT id, 'Sauce djoumblé', ARRAY['aubergine', 'gombo', 'poisson fumé', 'huile de palme'], 'Cuire les légumes avec le poisson fumé dans l''huile de palme', ARRAY['sauce', 'forêt']
FROM ethnies WHERE nom = 'Bété';

-- 5. DIOULA
INSERT INTO ethnies (nom, region, population_approx, description, histoire, carte_coords, tags)
VALUES (
  'Dioula',
  'Nord',
  2000000,
  'Les Dioula sont historiquement des commerçants. Leur langue est devenue une langue véhiculaire dans toute l''Afrique de l''Ouest. Ils ont joué un rôle majeur dans l''islamisation de la région.',
  'Originaires du Mali, les Dioula se sont installés en Côte d''Ivoire comme commerçants. Ils ont créé des réseaux commerciaux à travers toute l''Afrique de l''Ouest et ont contribué à la diffusion de l''Islam.',
  '{"lat": 9.4500, "lng": -5.5167}',
  ARRAY['mandé', 'nord', 'commerce', 'islam']
);

-- Langue Dioula
INSERT INTO langues (ethnie_id, nom, code, famille, locuteurs_approx)
SELECT id, 'Dioula', 'dyu', 'mande', 3000000 FROM ethnies WHERE nom = 'Dioula';

-- Mots Dioula
INSERT INTO mots_traductions (langue_id, mot_fr, mot_local, phonetique, theme)
SELECT l.id, 'Bonjour', 'I ni sɔgɔma', 'i ni so-go-ma', 'salutations'
FROM langues l JOIN ethnies e ON l.ethnie_id = e.id WHERE e.nom = 'Dioula';

INSERT INTO mots_traductions (langue_id, mot_fr, mot_local, phonetique, theme)
SELECT l.id, 'Merci', 'I ni cɛ', 'i ni tchè', 'salutations'
FROM langues l JOIN ethnies e ON l.ethnie_id = e.id WHERE e.nom = 'Dioula';

INSERT INTO mots_traductions (langue_id, mot_fr, mot_local, phonetique, theme)
SELECT l.id, 'Comment allez-vous?', 'I ka kɛnɛ wa?', 'i ka kè-nè wa', 'salutations'
FROM langues l JOIN ethnies e ON l.ethnie_id = e.id WHERE e.nom = 'Dioula';

-- Rites Dioula
INSERT INTO rites (ethnie_id, nom, type, description, periode)
SELECT id, 'Ramadan', 'fête', 'Mois sacré de jeûne et de prière dans la tradition islamique', 'Variable (calendrier lunaire)'
FROM ethnies WHERE nom = 'Dioula';

-- Gastronomie Dioula
INSERT INTO gastronomie (ethnie_id, nom, ingredients, recette, tags)
SELECT id, 'Tô', ARRAY['mil', 'eau', 'sauce'], 'Cuire la farine de mil dans l''eau bouillante en remuant jusqu''à obtenir une pâte ferme', ARRAY['plat principal', 'nord']
FROM ethnies WHERE nom = 'Dioula';

-- Module d'apprentissage Dioula
INSERT INTO modules_apprentissage (langue_id, titre, niveau, ordre, xp_reward)
SELECT l.id, 'Salutations en Dioula', 'grain_de_sable', 1, 10
FROM langues l JOIN ethnies e ON l.ethnie_id = e.id WHERE e.nom = 'Dioula';

-- Questions quiz
INSERT INTO questions_quiz (module_id, type, enonce, options, reponse_correcte, explication)
SELECT m.id, 'traduction', 'Comment dit-on "Bonjour" en Dioula?',
  '["I ni sɔgɔma", "I ni cɛ", "I ka kɛnɛ wa", "A bada"]'::jsonb,
  'I ni sɔgɔma',
  'I ni sɔgɔma est la salutation du matin en Dioula'
FROM modules_apprentissage m WHERE m.titre = 'Salutations en Dioula';

INSERT INTO questions_quiz (module_id, type, enonce, options, reponse_correcte, explication)
SELECT m.id, 'traduction', 'Que signifie "I ni cɛ" en français?',
  '["Bonjour", "Merci", "Au revoir", "Comment allez-vous?"]'::jsonb,
  'Merci',
  'I ni cɛ est l''expression pour remercier quelqu''un'
FROM modules_apprentissage m WHERE m.titre = 'Salutations en Dioula';
