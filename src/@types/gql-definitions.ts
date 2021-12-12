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
};

export interface CraftId {
  __typename?: 'CraftId';
  id?: Maybe<Scalars['ID']>;
}

export interface CraftType {
  __typename?: 'CraftType';
  age?: Maybe<Scalars['Int']>;
  brand?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<OwnerType>;
  price?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
}

export interface CraftsResult {
  __typename?: 'CraftsResult';
  edges?: Maybe<Array<Maybe<CraftType>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']>;
}

export interface Mutation {
  __typename?: 'Mutation';
  addCraft?: Maybe<CraftId>;
  updateCraft?: Maybe<CraftType>;
}


export type MutationAddCraftArgs = {
  age?: InputMaybe<Scalars['Int']>;
  brand?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateCraftArgs = {
  age?: InputMaybe<Scalars['Int']>;
  brand?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export interface OwnerType {
  __typename?: 'OwnerType';
  crafts?: Maybe<Array<Maybe<CraftType>>>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
}

export interface PageInfo {
  __typename?: 'PageInfo';
  currentPage?: Maybe<Scalars['Int']>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  totalPages?: Maybe<Scalars['Int']>;
}

export interface Query {
  __typename?: 'Query';
  Craft?: Maybe<CraftType>;
  Crafts?: Maybe<CraftsResult>;
  Owner?: Maybe<OwnerType>;
  Owners?: Maybe<Array<Maybe<OwnerType>>>;
}


export type QueryCraftArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryCraftsArgs = {
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryOwnerArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type GetCraftsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCraftsQuery = { __typename?: 'Query', Crafts?: { __typename?: 'CraftsResult', edges?: Array<{ __typename?: 'CraftType', id: string } | null | undefined> | null | undefined } | null | undefined };


      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    
export type CraftIdKeySpecifier = ('id' | CraftIdKeySpecifier)[];
export type CraftIdFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CraftTypeKeySpecifier = ('age' | 'brand' | 'id' | 'name' | 'owner' | 'price' | 'type' | CraftTypeKeySpecifier)[];
export type CraftTypeFieldPolicy = {
	age?: FieldPolicy<any> | FieldReadFunction<any>,
	brand?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	owner?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CraftsResultKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | CraftsResultKeySpecifier)[];
export type CraftsResultFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('addCraft' | 'updateCraft' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	addCraft?: FieldPolicy<any> | FieldReadFunction<any>,
	updateCraft?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OwnerTypeKeySpecifier = ('crafts' | 'email' | 'firstName' | 'id' | 'lastName' | OwnerTypeKeySpecifier)[];
export type OwnerTypeFieldPolicy = {
	crafts?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PageInfoKeySpecifier = ('currentPage' | 'hasNextPage' | 'offset' | 'totalPages' | PageInfoKeySpecifier)[];
export type PageInfoFieldPolicy = {
	currentPage?: FieldPolicy<any> | FieldReadFunction<any>,
	hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>,
	offset?: FieldPolicy<any> | FieldReadFunction<any>,
	totalPages?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('Craft' | 'Crafts' | 'Owner' | 'Owners' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	Craft?: FieldPolicy<any> | FieldReadFunction<any>,
	Crafts?: FieldPolicy<any> | FieldReadFunction<any>,
	Owner?: FieldPolicy<any> | FieldReadFunction<any>,
	Owners?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	CraftId: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CraftIdKeySpecifier | (() => undefined | CraftIdKeySpecifier),
		fields?: CraftIdFieldPolicy,
	},
	CraftType: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CraftTypeKeySpecifier | (() => undefined | CraftTypeKeySpecifier),
		fields?: CraftTypeFieldPolicy,
	},
	CraftsResult: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CraftsResultKeySpecifier | (() => undefined | CraftsResultKeySpecifier),
		fields?: CraftsResultFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	OwnerType: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OwnerTypeKeySpecifier | (() => undefined | OwnerTypeKeySpecifier),
		fields?: OwnerTypeFieldPolicy,
	},
	PageInfo: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PageInfoKeySpecifier | (() => undefined | PageInfoKeySpecifier),
		fields?: PageInfoFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;