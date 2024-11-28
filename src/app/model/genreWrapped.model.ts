
import { Genre } from './genre.model';
export class genreWrapper{
_embedded!: { genres: Genre[]};
}