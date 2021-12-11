import type { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export interface Ability {
  __typename?: 'Ability';
  description?: Maybe<Scalars['String']>;
  effect?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  is_hidden?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  /** array of Pokemon that can have the queried Ability */
  pokemon?: Maybe<Array<Maybe<Pokemon>>>;
}

export enum CacheControlScope {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC'
}

export interface DexEntry {
  __typename?: 'DexEntry';
  description?: Maybe<Scalars['String']>;
  /** game/version the queried DexEntry is from */
  game?: Maybe<Game>;
}

export interface Dominant_Color {
  __typename?: 'Dominant_Color';
  b?: Maybe<Scalars['Int']>;
  dark?: Maybe<Scalars['String']>;
  g?: Maybe<Scalars['Int']>;
  light?: Maybe<Scalars['String']>;
  original?: Maybe<Scalars['String']>;
  r?: Maybe<Scalars['Int']>;
}

export interface EggGroup {
  __typename?: 'EggGroup';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  /** array of Pokemon in the queried egg group */
  pokemon?: Maybe<Array<Maybe<Pokemon>>>;
}

/** EvolutionCriteria can be one or more of several possible different types */
export type EvolutionCriteria = Gender | Item | Location | Move | OtherEvolutionCriteria | Type;

export interface Game {
  __typename?: 'Game';
  generation?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  /** array of Regions that are found in the queried Game */
  regions?: Maybe<Array<Maybe<Region>>>;
}

export interface Gender {
  __typename?: 'Gender';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
}

export interface Item {
  __typename?: 'Item';
  bag_pocket?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  /** Use in an evolution_criteria query; returns the name of the evolution criteria that must have been met for the Pokémon to have evolved */
  effect?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  sprite?: Maybe<Scalars['String']>;
}

export interface Location {
  __typename?: 'Location';
  /** array of games/versions in which pokemon are found at the queried Location */
  games?: Maybe<Array<Maybe<Game>>>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  /** array of Pokemon that can be found at the queried Location */
  pokemon?: Maybe<Array<Maybe<Pokemon>>>;
  region?: Maybe<Region>;
}

export interface Move {
  __typename?: 'Move';
  accuracy?: Maybe<Scalars['Int']>;
  ailment?: Maybe<Scalars['String']>;
  /** physical or special */
  damage_class?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  /** possible status condition effect */
  effect?: Maybe<Scalars['String']>;
  effect_chance?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  /** level, egg, move tutor, tm/hm */
  learn_methods?: Maybe<Array<Maybe<MoveLearnMethod>>>;
  name?: Maybe<Scalars['String']>;
  original_games?: Maybe<Array<Maybe<Game>>>;
  power?: Maybe<Scalars['Int']>;
  pp?: Maybe<Scalars['Int']>;
  priority?: Maybe<Scalars['Int']>;
  type?: Maybe<Type>;
}

export interface MoveDescription {
  __typename?: 'MoveDescription';
  description?: Maybe<Scalars['String']>;
  games?: Maybe<Array<Maybe<Game>>>;
}

export interface MoveLearnMethod {
  __typename?: 'MoveLearnMethod';
  games?: Maybe<Array<Maybe<Game>>>;
  level_learned_at?: Maybe<Scalars['Int']>;
  /** how the Pokemon learns the queried Move */
  method?: Maybe<Scalars['String']>;
}

export interface NameAndId {
  __typename?: 'NameAndId';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
}

export interface OtherEvolutionCriteria {
  __typename?: 'OtherEvolutionCriteria';
  /** example response: time_of_day */
  evolution_criteria_name?: Maybe<Scalars['String']>;
  /** example response: night */
  value?: Maybe<Scalars['String']>;
}

/** query for an individual Pokemon's info */
export interface Pokemon {
  __typename?: 'Pokemon';
  /** array of Abilities that the queried Pokemon can have */
  abilities?: Maybe<Array<Maybe<Ability>>>;
  base_experience?: Maybe<Scalars['Int']>;
  base_happiness?: Maybe<Scalars['Int']>;
  /** base stats of the queried Pokemon */
  base_stats?: Maybe<Stats>;
  /** capture rate of the queried Pokemon when using a normal Pokeball at full health */
  capture_rate?: Maybe<Scalars['Int']>;
  /** basic color of the queried Pokemon */
  color?: Maybe<Scalars['String']>;
  /** dominant color of the queried Pokemon's image */
  dominant_color?: Maybe<Dominant_Color>;
  /** array of the different EggGroups that the queried Pokemon belongs to */
  egg_groups?: Maybe<Array<Maybe<EggGroup>>>;
  /** the Pokemon at the 'beginning' of the queried Pokemon's evolution chain (i.e. Charmander, even if you requested Charizard) */
  evolution_chain_start: Pokemon;
  /** array of all criteria that must be met for the queried Pokemon to evolve */
  evolution_criteria?: Maybe<Array<Maybe<EvolutionCriteria>>>;
  /** what triggers the queried Pokemon to evolve if all evolution criteria have been met */
  evolution_trigger?: Maybe<Scalars['String']>;
  /** Pokemon that the queried Pokemon evolves from */
  evolves_from?: Maybe<Pokemon>;
  /** array of Pokemon that the queried Pokemon can evolve into */
  evolves_to?: Maybe<Array<Maybe<Pokemon>>>;
  /** array of Games that the queried Pokemon is found in */
  games?: Maybe<Array<Maybe<Game>>>;
  /** percent chance of the queried Pokémon being female (-1 for genderless) */
  gender_rate?: Maybe<Scalars['Float']>;
  /** which generation the queried Pokemon debuted in */
  generation?: Maybe<Scalars['String']>;
  genus?: Maybe<Scalars['String']>;
  growth_rate?: Maybe<Scalars['String']>;
  hatch_counter?: Maybe<Scalars['Int']>;
  /** height in meters */
  height?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  is_baby?: Maybe<Scalars['Boolean']>;
  /** true if it's the default form, false if it's a variant (i.e. alola, galar, mega, etc) */
  is_default?: Maybe<Scalars['Boolean']>;
  /** array of Locations that the queried Pokemon can be found in */
  locations?: Maybe<Array<Maybe<Location>>>;
  /** array of Move objects */
  moves?: Maybe<Array<Maybe<Move>>>;
  name?: Maybe<Scalars['String']>;
  nat_dex_num?: Maybe<Scalars['Int']>;
  /** array of DexEntry objects */
  pokedex_entries?: Maybe<Array<Maybe<DexEntry>>>;
  shape?: Maybe<Scalars['String']>;
  /** array of Sprite objects */
  sprites?: Maybe<Sprites>;
  /** array of all the different Types of the queried Pokemon */
  types?: Maybe<Array<Maybe<Type>>>;
  /** array of different variant forms of the queried Pokemon */
  variants?: Maybe<Array<Maybe<Pokemon>>>;
  /** weight in kilograms */
  weight?: Maybe<Scalars['Int']>;
}


/** query for an individual Pokemon's info */
export type PokemonAbilitiesArgs = {
  game?: InputMaybe<Scalars['String']>;
};


/** query for an individual Pokemon's info */
export type PokemonEvolution_CriteriaArgs = {
  game?: InputMaybe<Scalars['String']>;
};


/** query for an individual Pokemon's info */
export type PokemonMovesArgs = {
  game: Scalars['String'];
};

export interface Query {
  __typename?: 'Query';
  ability?: Maybe<Ability>;
  allAbilities?: Maybe<Array<Maybe<Ability>>>;
  allEggGroups?: Maybe<Array<Maybe<EggGroup>>>;
  allGames?: Maybe<Array<Maybe<Game>>>;
  allItems?: Maybe<Array<Maybe<Item>>>;
  allLocations?: Maybe<Array<Maybe<Location>>>;
  allMoves?: Maybe<Array<Maybe<Move>>>;
  /** get range of Pokemon starting from start variable */
  allPokemon?: Maybe<Array<Maybe<Pokemon>>>;
  allRegions?: Maybe<Array<Maybe<Region>>>;
  allTypes?: Maybe<Array<Maybe<Type>>>;
  eggGroup?: Maybe<EggGroup>;
  game?: Maybe<Game>;
  item?: Maybe<Item>;
  location?: Maybe<Location>;
  move?: Maybe<Move>;
  pokemon?: Maybe<Pokemon>;
  region?: Maybe<Region>;
  type?: Maybe<Type>;
}


export type QueryAbilityArgs = {
  game?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
};


export type QueryAllPokemonArgs = {
  filter?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryAllTypesArgs = {
  end?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};


export type QueryEggGroupArgs = {
  id: Scalars['Int'];
};


export type QueryGameArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryItemArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryLocationArgs = {
  id: Scalars['Int'];
};


export type QueryMoveArgs = {
  id: Scalars['Int'];
};


export type QueryPokemonArgs = {
  id: Scalars['Int'];
};


export type QueryRegionArgs = {
  id: Scalars['Int'];
};


export type QueryTypeArgs = {
  id: Scalars['Int'];
};

export interface Region {
  __typename?: 'Region';
  /** array of Games the queried Region is found in */
  games?: Maybe<Array<Maybe<Game>>>;
  id?: Maybe<Scalars['Int']>;
  /** array of Locations that are in the queried Region */
  locations?: Maybe<Array<Maybe<Location>>>;
  name?: Maybe<Scalars['String']>;
}

export interface Sprites {
  __typename?: 'Sprites';
  back_default?: Maybe<Scalars['String']>;
  back_female?: Maybe<Scalars['String']>;
  back_shiny?: Maybe<Scalars['String']>;
  back_shiny_female?: Maybe<Scalars['String']>;
  front_default?: Maybe<Scalars['String']>;
  front_female?: Maybe<Scalars['String']>;
  front_shiny?: Maybe<Scalars['String']>;
  front_shiny_female?: Maybe<Scalars['String']>;
}

export interface Stats {
  __typename?: 'Stats';
  attack?: Maybe<Scalars['Int']>;
  defense?: Maybe<Scalars['Int']>;
  hp?: Maybe<Scalars['Int']>;
  special_attack?: Maybe<Scalars['Int']>;
  special_defense?: Maybe<Scalars['Int']>;
  speed?: Maybe<Scalars['Int']>;
}

/** Pokemon type (i.e. Grass, Electric, Water, etc) */
export interface Type {
  __typename?: 'Type';
  /** array of super effective Types that the queried type receives double damage from */
  double_damage_from?: Maybe<Array<Maybe<Type>>>;
  /** array of Types the queried type inflicts double damage upon */
  double_damage_to?: Maybe<Array<Maybe<Type>>>;
  /** array of not very effective Types the queried type receives half damage from */
  half_damage_from?: Maybe<Array<Maybe<Type>>>;
  /** array of Types the queried type inflicts double damage upon */
  half_damage_to?: Maybe<Array<Maybe<Type>>>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  /** array of ineffective Types the queried type receives no damage from */
  no_damage_from?: Maybe<Array<Maybe<Type>>>;
  /** array of Types the queried type inflicts no damage upon */
  no_damage_to?: Maybe<Array<Maybe<Type>>>;
  /** array of Pokemon that have the queried Type */
  pokemon?: Maybe<Array<Maybe<Pokemon>>>;
}

export type GetAllPokemonQueryVariables = Exact<{
  limit: Scalars['Int'];
}>;


export type GetAllPokemonQuery = { __typename?: 'Query', allPokemon?: Array<{ __typename?: 'Pokemon', sprites?: { __typename?: 'Sprites', back_default?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined };


      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "EvolutionCriteria": [
      "Gender",
      "Item",
      "Location",
      "Move",
      "OtherEvolutionCriteria",
      "Type"
    ]
  }
};
      export default result;
    
export type AbilityKeySpecifier = ('description' | 'effect' | 'id' | 'is_hidden' | 'name' | 'pokemon' | AbilityKeySpecifier)[];
export type AbilityFieldPolicy = {
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	effect?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	is_hidden?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	pokemon?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DexEntryKeySpecifier = ('description' | 'game' | DexEntryKeySpecifier)[];
export type DexEntryFieldPolicy = {
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	game?: FieldPolicy<any> | FieldReadFunction<any>
};
export type Dominant_ColorKeySpecifier = ('b' | 'dark' | 'g' | 'light' | 'original' | 'r' | Dominant_ColorKeySpecifier)[];
export type Dominant_ColorFieldPolicy = {
	b?: FieldPolicy<any> | FieldReadFunction<any>,
	dark?: FieldPolicy<any> | FieldReadFunction<any>,
	g?: FieldPolicy<any> | FieldReadFunction<any>,
	light?: FieldPolicy<any> | FieldReadFunction<any>,
	original?: FieldPolicy<any> | FieldReadFunction<any>,
	r?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EggGroupKeySpecifier = ('id' | 'name' | 'pokemon' | EggGroupKeySpecifier)[];
export type EggGroupFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	pokemon?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GameKeySpecifier = ('generation' | 'id' | 'name' | 'regions' | GameKeySpecifier)[];
export type GameFieldPolicy = {
	generation?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	regions?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GenderKeySpecifier = ('id' | 'name' | GenderKeySpecifier)[];
export type GenderFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ItemKeySpecifier = ('bag_pocket' | 'cost' | 'description' | 'effect' | 'id' | 'name' | 'sprite' | ItemKeySpecifier)[];
export type ItemFieldPolicy = {
	bag_pocket?: FieldPolicy<any> | FieldReadFunction<any>,
	cost?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	effect?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	sprite?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LocationKeySpecifier = ('games' | 'id' | 'name' | 'pokemon' | 'region' | LocationKeySpecifier)[];
export type LocationFieldPolicy = {
	games?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	pokemon?: FieldPolicy<any> | FieldReadFunction<any>,
	region?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MoveKeySpecifier = ('accuracy' | 'ailment' | 'damage_class' | 'description' | 'effect' | 'effect_chance' | 'id' | 'learn_methods' | 'name' | 'original_games' | 'power' | 'pp' | 'priority' | 'type' | MoveKeySpecifier)[];
export type MoveFieldPolicy = {
	accuracy?: FieldPolicy<any> | FieldReadFunction<any>,
	ailment?: FieldPolicy<any> | FieldReadFunction<any>,
	damage_class?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	effect?: FieldPolicy<any> | FieldReadFunction<any>,
	effect_chance?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	learn_methods?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	original_games?: FieldPolicy<any> | FieldReadFunction<any>,
	power?: FieldPolicy<any> | FieldReadFunction<any>,
	pp?: FieldPolicy<any> | FieldReadFunction<any>,
	priority?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MoveDescriptionKeySpecifier = ('description' | 'games' | MoveDescriptionKeySpecifier)[];
export type MoveDescriptionFieldPolicy = {
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	games?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MoveLearnMethodKeySpecifier = ('games' | 'level_learned_at' | 'method' | MoveLearnMethodKeySpecifier)[];
export type MoveLearnMethodFieldPolicy = {
	games?: FieldPolicy<any> | FieldReadFunction<any>,
	level_learned_at?: FieldPolicy<any> | FieldReadFunction<any>,
	method?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NameAndIdKeySpecifier = ('id' | 'name' | NameAndIdKeySpecifier)[];
export type NameAndIdFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OtherEvolutionCriteriaKeySpecifier = ('evolution_criteria_name' | 'value' | OtherEvolutionCriteriaKeySpecifier)[];
export type OtherEvolutionCriteriaFieldPolicy = {
	evolution_criteria_name?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PokemonKeySpecifier = ('abilities' | 'base_experience' | 'base_happiness' | 'base_stats' | 'capture_rate' | 'color' | 'dominant_color' | 'egg_groups' | 'evolution_chain_start' | 'evolution_criteria' | 'evolution_trigger' | 'evolves_from' | 'evolves_to' | 'games' | 'gender_rate' | 'generation' | 'genus' | 'growth_rate' | 'hatch_counter' | 'height' | 'id' | 'is_baby' | 'is_default' | 'locations' | 'moves' | 'name' | 'nat_dex_num' | 'pokedex_entries' | 'shape' | 'sprites' | 'types' | 'variants' | 'weight' | PokemonKeySpecifier)[];
export type PokemonFieldPolicy = {
	abilities?: FieldPolicy<any> | FieldReadFunction<any>,
	base_experience?: FieldPolicy<any> | FieldReadFunction<any>,
	base_happiness?: FieldPolicy<any> | FieldReadFunction<any>,
	base_stats?: FieldPolicy<any> | FieldReadFunction<any>,
	capture_rate?: FieldPolicy<any> | FieldReadFunction<any>,
	color?: FieldPolicy<any> | FieldReadFunction<any>,
	dominant_color?: FieldPolicy<any> | FieldReadFunction<any>,
	egg_groups?: FieldPolicy<any> | FieldReadFunction<any>,
	evolution_chain_start?: FieldPolicy<any> | FieldReadFunction<any>,
	evolution_criteria?: FieldPolicy<any> | FieldReadFunction<any>,
	evolution_trigger?: FieldPolicy<any> | FieldReadFunction<any>,
	evolves_from?: FieldPolicy<any> | FieldReadFunction<any>,
	evolves_to?: FieldPolicy<any> | FieldReadFunction<any>,
	games?: FieldPolicy<any> | FieldReadFunction<any>,
	gender_rate?: FieldPolicy<any> | FieldReadFunction<any>,
	generation?: FieldPolicy<any> | FieldReadFunction<any>,
	genus?: FieldPolicy<any> | FieldReadFunction<any>,
	growth_rate?: FieldPolicy<any> | FieldReadFunction<any>,
	hatch_counter?: FieldPolicy<any> | FieldReadFunction<any>,
	height?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	is_baby?: FieldPolicy<any> | FieldReadFunction<any>,
	is_default?: FieldPolicy<any> | FieldReadFunction<any>,
	locations?: FieldPolicy<any> | FieldReadFunction<any>,
	moves?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	nat_dex_num?: FieldPolicy<any> | FieldReadFunction<any>,
	pokedex_entries?: FieldPolicy<any> | FieldReadFunction<any>,
	shape?: FieldPolicy<any> | FieldReadFunction<any>,
	sprites?: FieldPolicy<any> | FieldReadFunction<any>,
	types?: FieldPolicy<any> | FieldReadFunction<any>,
	variants?: FieldPolicy<any> | FieldReadFunction<any>,
	weight?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('ability' | 'allAbilities' | 'allEggGroups' | 'allGames' | 'allItems' | 'allLocations' | 'allMoves' | 'allPokemon' | 'allRegions' | 'allTypes' | 'eggGroup' | 'game' | 'item' | 'location' | 'move' | 'pokemon' | 'region' | 'type' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	ability?: FieldPolicy<any> | FieldReadFunction<any>,
	allAbilities?: FieldPolicy<any> | FieldReadFunction<any>,
	allEggGroups?: FieldPolicy<any> | FieldReadFunction<any>,
	allGames?: FieldPolicy<any> | FieldReadFunction<any>,
	allItems?: FieldPolicy<any> | FieldReadFunction<any>,
	allLocations?: FieldPolicy<any> | FieldReadFunction<any>,
	allMoves?: FieldPolicy<any> | FieldReadFunction<any>,
	allPokemon?: FieldPolicy<any> | FieldReadFunction<any>,
	allRegions?: FieldPolicy<any> | FieldReadFunction<any>,
	allTypes?: FieldPolicy<any> | FieldReadFunction<any>,
	eggGroup?: FieldPolicy<any> | FieldReadFunction<any>,
	game?: FieldPolicy<any> | FieldReadFunction<any>,
	item?: FieldPolicy<any> | FieldReadFunction<any>,
	location?: FieldPolicy<any> | FieldReadFunction<any>,
	move?: FieldPolicy<any> | FieldReadFunction<any>,
	pokemon?: FieldPolicy<any> | FieldReadFunction<any>,
	region?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RegionKeySpecifier = ('games' | 'id' | 'locations' | 'name' | RegionKeySpecifier)[];
export type RegionFieldPolicy = {
	games?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	locations?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SpritesKeySpecifier = ('back_default' | 'back_female' | 'back_shiny' | 'back_shiny_female' | 'front_default' | 'front_female' | 'front_shiny' | 'front_shiny_female' | SpritesKeySpecifier)[];
export type SpritesFieldPolicy = {
	back_default?: FieldPolicy<any> | FieldReadFunction<any>,
	back_female?: FieldPolicy<any> | FieldReadFunction<any>,
	back_shiny?: FieldPolicy<any> | FieldReadFunction<any>,
	back_shiny_female?: FieldPolicy<any> | FieldReadFunction<any>,
	front_default?: FieldPolicy<any> | FieldReadFunction<any>,
	front_female?: FieldPolicy<any> | FieldReadFunction<any>,
	front_shiny?: FieldPolicy<any> | FieldReadFunction<any>,
	front_shiny_female?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StatsKeySpecifier = ('attack' | 'defense' | 'hp' | 'special_attack' | 'special_defense' | 'speed' | StatsKeySpecifier)[];
export type StatsFieldPolicy = {
	attack?: FieldPolicy<any> | FieldReadFunction<any>,
	defense?: FieldPolicy<any> | FieldReadFunction<any>,
	hp?: FieldPolicy<any> | FieldReadFunction<any>,
	special_attack?: FieldPolicy<any> | FieldReadFunction<any>,
	special_defense?: FieldPolicy<any> | FieldReadFunction<any>,
	speed?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypeKeySpecifier = ('double_damage_from' | 'double_damage_to' | 'half_damage_from' | 'half_damage_to' | 'id' | 'name' | 'no_damage_from' | 'no_damage_to' | 'pokemon' | TypeKeySpecifier)[];
export type TypeFieldPolicy = {
	double_damage_from?: FieldPolicy<any> | FieldReadFunction<any>,
	double_damage_to?: FieldPolicy<any> | FieldReadFunction<any>,
	half_damage_from?: FieldPolicy<any> | FieldReadFunction<any>,
	half_damage_to?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	no_damage_from?: FieldPolicy<any> | FieldReadFunction<any>,
	no_damage_to?: FieldPolicy<any> | FieldReadFunction<any>,
	pokemon?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Ability: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AbilityKeySpecifier | (() => undefined | AbilityKeySpecifier),
		fields?: AbilityFieldPolicy,
	},
	DexEntry: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DexEntryKeySpecifier | (() => undefined | DexEntryKeySpecifier),
		fields?: DexEntryFieldPolicy,
	},
	Dominant_Color: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | Dominant_ColorKeySpecifier | (() => undefined | Dominant_ColorKeySpecifier),
		fields?: Dominant_ColorFieldPolicy,
	},
	EggGroup: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EggGroupKeySpecifier | (() => undefined | EggGroupKeySpecifier),
		fields?: EggGroupFieldPolicy,
	},
	Game: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GameKeySpecifier | (() => undefined | GameKeySpecifier),
		fields?: GameFieldPolicy,
	},
	Gender: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GenderKeySpecifier | (() => undefined | GenderKeySpecifier),
		fields?: GenderFieldPolicy,
	},
	Item: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ItemKeySpecifier | (() => undefined | ItemKeySpecifier),
		fields?: ItemFieldPolicy,
	},
	Location: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LocationKeySpecifier | (() => undefined | LocationKeySpecifier),
		fields?: LocationFieldPolicy,
	},
	Move: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MoveKeySpecifier | (() => undefined | MoveKeySpecifier),
		fields?: MoveFieldPolicy,
	},
	MoveDescription: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MoveDescriptionKeySpecifier | (() => undefined | MoveDescriptionKeySpecifier),
		fields?: MoveDescriptionFieldPolicy,
	},
	MoveLearnMethod: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MoveLearnMethodKeySpecifier | (() => undefined | MoveLearnMethodKeySpecifier),
		fields?: MoveLearnMethodFieldPolicy,
	},
	NameAndId: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NameAndIdKeySpecifier | (() => undefined | NameAndIdKeySpecifier),
		fields?: NameAndIdFieldPolicy,
	},
	OtherEvolutionCriteria: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OtherEvolutionCriteriaKeySpecifier | (() => undefined | OtherEvolutionCriteriaKeySpecifier),
		fields?: OtherEvolutionCriteriaFieldPolicy,
	},
	Pokemon: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PokemonKeySpecifier | (() => undefined | PokemonKeySpecifier),
		fields?: PokemonFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Region: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RegionKeySpecifier | (() => undefined | RegionKeySpecifier),
		fields?: RegionFieldPolicy,
	},
	Sprites: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SpritesKeySpecifier | (() => undefined | SpritesKeySpecifier),
		fields?: SpritesFieldPolicy,
	},
	Stats: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StatsKeySpecifier | (() => undefined | StatsKeySpecifier),
		fields?: StatsFieldPolicy,
	},
	Type: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TypeKeySpecifier | (() => undefined | TypeKeySpecifier),
		fields?: TypeFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;