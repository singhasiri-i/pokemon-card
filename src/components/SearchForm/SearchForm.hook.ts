// เก็บ function การทำงานต่างๆ

import React, { useEffect } from 'react'
import { pokemonListService, pokemonDetailService } from "@/services"
// callData กับ useEffect เอามาดึงข้อมูล API (ย้ายมาจาก Home)
// // ให้มันดึงตัง List ก่อนแล้วค่อยดึง data จาก Detail มาใส่ใน List
import { useForm } from 'react-hook-form'
import { usePokemonListStore } from "@/store/pokemonList"
import { generationList } from '@/utils/optionList'
import { IPokemonDetailResponse } from '@/interface/pokemonDetail'

const useSearchForm = () => {
    const { register, handleSubmit, watch, formState: { errors }, } = useForm() 
    // เอา useForm ไปประกาศตัวแปร โครง copy มาจาก https://react-hook-form.com/get-started (JS)
    const { setFetchPokemonList, fetchPokemon, setPokemonList } = usePokemonListStore()

    const keyword = watch("keyword") // อยากรู้ว่าค่าเปลี่ยนตอนไหนใช้ useEffect
    const generation = watch("generation") // 
    const type = watch("type") // 
    const sort = watch("sort") // 

  const callData = async (filter: { name: string; limit: number; offset: number }) => { // ส่งค่ามาจาก useEffect ด้านล่าง
    setFetchPokemonList({ data : [], loading : true, error : null }) // set ตอน loading ต้องให้มัน fetch ก่อนทำอย่างอื่น
    const responseList = await pokemonListService.getPokemonList(filter.limit, filter.offset) // ส่งมาจาก callData async ด้านบน
    const pokeList = [] // สร้าง array เปล่าๆ มาเก็บ pokeData

    if(responseList.status === 200) { // ถ้าสำเร็จจะให้ fetch Detail ยัดกลับเข้าไปใน List
        const responseResults = responseList.data?.results || [] // ถ้าไม่มีก็ออก array เปล่า
        for (const pokemon of responseResults) {
            const response = await pokemonDetailService.getPokemonDetail(pokemon.name)
            const pokeData = response.data
            if(pokeData)
              pokeList.push({ ...pokeData, // push pokeData และ image เป็น Object ลงไปใน pokeList
                image:pokeData.sprites.other.dream_world.front_default 
                || pokeData.sprites.other['official-artwork'].front_default })
        }
        console.log("=====pokeList",pokeList);
        
        setFetchPokemonList({ data : pokeList, loading : false, error : null }) // ได้ List มาแล้ว set ลง store
        const data = filterPokemon(pokeList, keyword, type, sort)
        setPokemonList({ data : data, loading : false, error : null })
        // fetch เสร็จต้องเก็บลง data ที่ใช้ show ด้วย เพราะมันจะเก็บลง pokemonList ก็ต่อเมื่อเรา search ไม่ search ก็ไม่ขึ้น
    } else { // ถ้า error จะให้มันทำอันนี้ แต่จะต้องมี type จัดการกับ error ด้วย เขียนเพิ่มใน service>>pokemonList
        setFetchPokemonList({ data : [], loading : false, error : responseList.error, })
    }
  }
// function สำหรับ filter type
  const filterPokemon = (pokeList:IPokemonDetailResponse[], keyword:string, type:string, sort:'id' | 'name') => {
    const keywordFilter = pokeList.filter((item) => item.name.toLowerCase().includes(keyword?.toLowerCase()))
    console.log("keywordFilter",keywordFilter);
    console.log("keyword",keyword);
    console.log("pokeList",pokeList);
    
    
    const typeFilter = 
    type !== 'all types' 
    ? keywordFilter.filter((item) => item.types.find((f) => f.type.name.toLowerCase().includes(type.toLowerCase())))
    // ถ้ามีหลาย type ตรงกับ type ที่เลือกมั้ย ถ้าเจอก็ return ออกไป ถ้าไม่มีก็​ให้ filter
    : keywordFilter // แต่ถ้าเป็น All Type ก็ให้ return ทั้งหมดออกไปเลย
    // เอา typeFilter มา sort ต่อ ซึ่งมันจะเรียงตาม id กับ name ดังนั้นต้องสร้าง function เพิ่ม
    console.log("typeFilter",typeFilter);
    return sortBy(typeFilter, sort)
  }

  const sortBy = (data:IPokemonDetailResponse[], type:'id' | 'name') => {
    switch (type) {
      case  'id':
        return data.sort((a, b) => a.id - b.id)
      case  'name':  // ถ้า sort ที่เป็น string ต้องเขียนเงื่อนไขเช็คเอง
        return data.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
      default:
        return data.sort((a, b) => a.id - b.id)
    }
  }

  useEffect(() => {
    if(generation !== undefined) {
      callData(generationList[generation]) // generation รับค่ามาเป็น index เลยต้องเรียกเป็น generationList
    }
  }, [generation]) // ทำให้มันเรียกทุกครั้งที่ render

  useEffect(() => {
    const data = filterPokemon(fetchPokemon.data, keyword, type, sort) // โยน 3 parameter เข้าไปเพื่อให้ typeFilter กับ sortBy function ทำงาน
    setPokemonList({ data : data, loading : false, error : null, })
  }, [keyword, type, sort]) // data ที่ถูก filter จะถูก set ลง pokemonList ส่วน fetchPokemon จะเป็น data ตัวเต็มก่อนที่จะเอาไปทำอย่างอื่น

  return {
    fieldKeyword    : register("keyword"), // เอาไปใส่ใน SearchForm.tsx ตรง search name
    fieldGeneration : register("generation"), // เอาไปใส่ใน form สำหรับ filter
    fieldType       : register("type"), // เอาไปใส่ใน form สำหรับ filter
    fieldSort       : register("sort"), // เอาไปใส่ใน form สำหรับ sort
  }
}

export { useSearchForm }
