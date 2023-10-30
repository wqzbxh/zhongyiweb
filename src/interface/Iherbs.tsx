export interface HerbsInterface {
  common_name: string;
  id: string;
  other_names: string;
  scientific_name: string;
  medicinal_smell_id: string;
  character_id: string;
  toxicity_id: string;
  book_id: number;
  efficacy: string;
  origin: string | null;
  type: string;
  created_at: string;
  book_name: string;
  medicinal_smell_name: string;
  medicine_character_name: string;
  toxicity_name?:string;
  pinyin?:string
}


export interface Herb {
    herb_id: number;
    common_name: string;
    scientific_name: string | null;
    other_names: string;
    properties: string | null;
    tastes: string | null;
    efficacy: string;
    image_url: string | null;
    origin: string | null;
    created_at: string;
    type: string;
    medicinal_smell_id: string;
    character_id: string;
    toxicity_id: string;
    book_id: number;
    pinyin: string | null;
    book_name: string;
    book_author: string | null;
    Introduction: string;
    create_at: string;
    medicinal_smell_name: string;
    toxicity_name: string;
    medicine_character_name: string;
    other: OtherHerb[];
  }
  
  export interface OtherHerb {
    herb_id: number;
    common_name: string;
    scientific_name: string | null;
    other_names: string;
    properties: string | null;
    tastes: string | null;
    efficacy: string;
    image_url: string | null;
    origin: string | null;
    created_at: string;
    type: string | null;
    medicinal_smell_id: string;
    character_id: string;
    toxicity_id: string;
    book_id: number;
    pinyin: string | null;
    book_name: string;
    medicinal_smell_name: string;
    toxicity_name: string;
    medicine_character_name: string;
  }
  
  