export default interface JishoResponse {
    meta: Meta
    data: Data[]
}

export interface Meta {
    status: number
}

export interface Data {
    slug: string
    is_common?: boolean
    tags: string[]
    jlpt: string[]
    japanese: Japanese[]
    senses: Sense[]
    attribution: Attribution
}

interface Japanese {
    word: string
    reading?: string
}

interface Sense {
    english_definitions: string[]
    parts_of_speech: string[]
    links: Link[]
    tags: string[]
    //    restrictions: any[]
    see_also: string[]
    antonyms: string[]
    //    source: any[]
    info: string[]
    sentences?: string[]
}

interface Link {
    text: string
    url: string
}

interface Attribution {
    jmdict: boolean
    jmnedict: boolean
    dbpedia: any
}
