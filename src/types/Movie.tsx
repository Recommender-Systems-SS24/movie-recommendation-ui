export interface Movie {
    MovieID: string;
    Title: string;
}

export interface MovieExtended extends Movie {
    Rating: number;
    Genres: string[];
}

export interface MovieRecommendationList {
    List: MovieExtended[];
    Name: string;
}
