import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

	constructor( private readonly httpService: HttpService ) {}

	async executeSeed() {
		const { data } = await firstValueFrom(
			this.httpService.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=50')
				.pipe(
					catchError( (error: AxiosError) => {
						console.log(error.response.data);
						throw 'Ocurrió un error';
					})
				)
		);

		data.results.forEach(({name, url}) => {

			const segments = url.split('/');
			const no: number = segments[segments.length - 2];

		})

		return data.results;
	}

}
