import React from 'react'
// สามารถ import ถึงแค่ folder service ได้เพราะเรา export มาที่ index.ts แล้ว
import SearchForm from '@/components/SearchForm'
import { usePokemonListStore } from '@/store/pokemonList'
import PokemonCard from '@/components/PokemonCard'
import ReactLoading from "react-loading";

const HomePage = () => {
  const { pokemon, fetchPokemon } = usePokemonListStore() // ตอนโชว์ก็ต้องเปลี่ยนเป็นเอา pokemonList มาโชว์แทน fetch
  console.log(pokemon); // ลอง log ออกมาดูว่ารูปอยู่ที่ไหน

  return (
    <div className='w-[90%] m-[auto] max-w-[1100px]'>
      <div className='flex justify-center'>
        <img src="/images/logo.webp" className='max-h-[80px] mt-[20px' alt="logo" />
      </div>
      <SearchForm />
      {/* ทำ loading ถ้ากำลังโหลด ให้แสดง loading */}
      { fetchPokemon.loading &&  (
        <div className='h-[600px] flex justify-center item-center'>
          <ReactLoading type="spokes" color="#fff" />
        </div>
      )}
      {/* ส่วนด้านล่างถ้า loading เป็น false ก็ให้แสดงปกติ */}
      { !fetchPokemon.loading && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] mt-[40px]'>
          { pokemon.data?.map((item) => {
            return (
              <PokemonCard
              image={ item.image || "" } 
              name={ item.name }
              id={ item.id }
              types={ item.types }
              key={ item.id }
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default HomePage
