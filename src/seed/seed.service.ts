import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

	constructor(
		@InjectModel(Pokemon.name)
		private readonly pokemonModel: Model<Pokemon>,

		private readonly http: AxiosAdapter,
	) {}

	async executeSeed() {

		await this.pokemonModel.deleteMany({}); // borra todos los pokemon sjdakj

		// const { data } = await firstValueFrom(
		// 	this.httpService.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')
		// 		.pipe(
		// 			catchError( (error: AxiosError) => {
		// 				console.log(error.response.data);
		// 				throw 'Ocurrió un error';
		// 			})
		// 		)
		// );

		const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

		const PokeArray: {
			name: string;
			no: number;
		}[] = [];

		data.results.forEach(({name, url}) => {

			const segments = url.split('/');
			const no: number = +segments[segments.length - 2];

			// this.pokemonModel.create({ name, no });
			PokeArray.push({ name, no });

		})

		this.pokemonModel.insertMany(PokeArray);

		return data.results;
	}

}
