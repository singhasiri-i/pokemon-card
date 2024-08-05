import { create } from 'zustand'
import { IPokemonDetailResponse } from "@/interface/pokemonDetail"

const initStore = { // data เริ่มต้นที่เอาไว้โชว์
    pokemon: {
        data    : [],
        loading : false,
        error   : null,
    },
    fetchPokemon: { // data เริ่มต้นจริงๆ แต่ไม่ได้เอาไว้โชว์เพราะไม่งั้น refresh แล้วจะหาย
        data    : [],
        loading : false,
        error   : null,
    },
}

type pokemonType = { // สร้าง type ของ pokemon
    data    : IPokemonDetailResponse[]
    loading : boolean
    error   : null | any
}

type UsePokemonListStoreType = { // สร้าง type ของ usePokemonListStore
    pokemon: pokemonType // มี type เป็น pokemonType
    fetchPokemon: pokemonType  // มี type เป็น pokemonType
    setPokemonList:(value:pokemonType) => void,
    setFetchPokemonList:(value:pokemonType) => void,
    clearPokemon:() => void,
}

export const usePokemonListStore = create<UsePokemonListStoreType>((set) => ({
  ...initStore,
  // function จัดการ store
  setPokemonList:(value:pokemonType) => set({pokemon:value}), // รับค่า pokemontType ให้ set ลง pokemon (ใต้ initStore)
  setFetchPokemonList:(value:pokemonType) => set({fetchPokemon:value}), // รับค่า pokemontType ให้ set ลง fetchPokemon
  clearPokemon: () =>set({...initStore}), // ใข้ clear ค่า
}))

