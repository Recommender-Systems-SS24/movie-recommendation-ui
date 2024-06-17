export interface Movie {
    MovieID: string;
    Title: string;
    Rating: number;
    Genres: string[];
}

export interface MovieExtended extends Movie {
}

export interface MovieRecommendationList {
    List: MovieExtended[];
    Name: string;
}
