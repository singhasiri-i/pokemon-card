import axios from "axios"
import { POKEMON_BASE_URL } from "@/utils/constant"
import { IPokemonListResponse } from "@/interface/pokemonList"
import { handleResponse, IResponse } from "@/utils/handleResponse"

interface IGetPokemonListResponse extends IResponse {
    status  :   number | undefined
    data?    :   IPokemonListResponse
}

export const pokemonListService = {
    getPokemonList : async (
        limit?:number, offset?:number
    ):Promise<IGetPokemonListResponse> => {
        // limit กับ offset จะเปลี่ยนไปเรื่อยๆ

        try {
            const response = await axios.get(
                `${POKEMON_BASE_URL}/pokemon?limit=${limit || 151}
                &offset=${offset || 0}`
            ) // ถ้าไม่มี limit กับ offset ส่งมาจะให้ default เป็น 151 กับ 0
            return handleResponse.success(response)
        } catch (error: any) {
            return handleResponse.error(error)
        }
    }
}
