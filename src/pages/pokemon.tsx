import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { Fragment, useState } from "react";

import Layout from "@/components/layout/Layout";
import { emoji } from "@/components/Pokemons";

import { useGetPokemonNameJSONQuery } from "@/store/slices/pokemonJsonSlice";
import { useGetPokemonQuery } from "@/store/slices/pokemonSlice";

function Pokemon() {
	const { data: pokemonsName } = useGetPokemonNameJSONQuery();
	const [query, setQuery] = useState<string>("");
	const [selected, setSelected] = useState<string>("");
	const { data: pokemon, isLoading } = useGetPokemonQuery(
		selected.toLowerCase(),
		{
			skip: selected === "",
		},
	);

	const filteredPokemonName = pokemonsName
		?.filter((name) =>
			name

				.toLowerCase()
				.replace(/\s+/g, "")
				.includes(query.toLowerCase().replace(/\s+/g, "")),
		)
		.splice(0, 5);

	const types = pokemon?.types.map((e) => e.type.name);
	const states = pokemon?.stats.map((e) => e);

	return (
		<Layout>
			<section
				id="pokemon"
				className="layout grid items-center justify-center gap-6"
			>
				<h1 className="text-center">Find Pokemon</h1>
				<div
					id="combobox"
					className="grid w-full items-center justify-center gap-3"
				>
					<Combobox value={selected} onChange={setSelected}>
						<div className="relative mt-1">
							<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
								<Combobox.Input
									className="w-full border-none py-2 pr-10 pl-3 text-gray-900 text-sm leading-5 focus:ring-0"
									displayValue={(data: string) => data}
									onChange={(event) => setQuery(event.target.value)}
								/>
								<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
									<ChevronUpDownIcon
										className="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
								</Combobox.Button>
							</div>
							<Transition
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
								afterLeave={() => setQuery("")}
							>
								<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
									{pokemonsName?.length === 0 ? (
										<div className="relative cursor-default select-none px-4 py-2 text-gray-700">
											Nothing found.
										</div>
									) : (
										filteredPokemonName?.map((name, index) => (
											<Combobox.Option
												key={`${index}_${name}`}
												className={({ active }) =>
													`relative cursor-default select-none py-3 pr-4 pl-10 ${
														active ? "bg-teal-600 text-white" : "text-gray-900"
													}`
												}
												value={name}
											>
												{({ selected, active }) => (
													<>
														<span
															className={`block truncate ${
																selected ? "font-medium" : "font-normal"
															}`}
														>
															{name}
														</span>
														{selected ? (
															<span
																className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
																	active ? "text-white" : "text-teal-600"
																}`}
															>
																<CheckIcon
																	className="h-5 w-5"
																	aria-hidden="true"
																/>
															</span>
														) : null}
													</>
												)}
											</Combobox.Option>
										))
									)}
								</Combobox.Options>
							</Transition>
						</div>
					</Combobox>
				</div>

				{isLoading ? (
					<div className="text-2xl">isLoading...</div>
				) : (
					pokemon && (
						<div className="grid h-full w-full grid-rows-1 rounded-lg border-2 bg-gray-100 p-4 shadow-2xl">
							<div className="grid h-full w-full grid-cols-2 items-center justify-center gap-4">
								<div className="relative h-full w-full">
									<Image
										src={pokemon.sprites.front_default}
										alt="pokemon"
										objectFit="contain"
										layout="fill"
										priority
									/>
								</div>
								<div className="grid gap-3">
									<div id="pokemon_name">
										<h1 className="text-center text-2xl">
											{`${pokemon.name[0].toUpperCase()}${pokemon.name.slice(
												1,
											)}`}
										</h1>
									</div>
									<div id="pokemon_stat">
										{states?.map(({ stat, base_stat }) => (
											<h5
												key={stat.name}
												className="mb-2 font-bold text-gray-700"
											>
												<span className="mr-3">{emoji[stat.name]}</span>
												<span>
													{stat.name.toUpperCase()}: {base_stat}
												</span>
											</h5>
										))}
										<h5 className="mb-2 font-bold text-gray-700">
											<span className="mr-3">{emoji.height}</span>
											Height: {pokemon.height}
										</h5>
										<h5 className="mb-2 font-bold text-gray-700">
											<span className="mr-3">{emoji.weight}</span>
											weight: {pokemon.weight}
										</h5>
										<h5 className="mb-2 font-bold text-gray-700">
											<span className="mr-3">{emoji.types}</span>
											Types:{" "}
											{types?.map((name) => (
												<span key={name}>
													{emoji[name]} {name}
												</span>
											))}
										</h5>
									</div>
								</div>
							</div>
						</div>
					)
				)}
			</section>
		</Layout>
	);
}

export default Pokemon;
