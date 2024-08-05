// ใส่ UI

import React from 'react'
import { generationList, typesList, sortList } from "@/utils/optionList"
import { useSearchForm } from "@/components/SearchForm"

const SearchForm = () => {
    const { fieldKeyword, fieldGeneration, fieldType, fieldSort } = useSearchForm()

  return (
    <form className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px]'>

        <div>
            <label htmlFor="generation" className="block mb-2 text-mb font-medium text-white">
                Generation
            </label>
            <select
                { ...fieldGeneration } // import มาจาก useSearchForm() แล้วเอามาใส่ใน form
                id="generation" 
                className="capitalize bg-[#253641] border border-gray-300 text-white text-sm rounded-lg focus:ring-[#395CAB] focus:border-[#395CAB] block w-full p-2.5"
            >
                    { generationList.map((item, index) => { // เอาของใน optionList มา .map ใหม่ ถ้าใช้ .map ต้องใส่ key ให้ด้วย และ value จะได้เอาไว้เรียกใช้ตอนเป็น array
                        return <option className="capitalize" key={`generation-key${index}`} value={index}>{ item.name }</option>
                    })}
            </select>
        </div>

        <div>
            <label htmlFor="type" className="block mb-2 text-mb font-medium text-white">
                Type
            </label>
            <select 
                { ...fieldType } // import มาจาก useSearchForm() แล้วเอามาใส่ใน form
                id="type" 
                className="capitalize bg-[#253641] border border-gray-300 text-white text-sm rounded-lg focus:ring-[#395CAB] focus:border-[#395CAB] block w-full p-2.5"
            >
                    { typesList.map((item, index) => { // เอาของใน optionList มา .map ใหม่ ถ้าใช้ .map ต้องใส่ key ให้ด้วย และ value จะได้เอาไว้เรียกใช้ตอนเป็น array
                        return <option className="capitalize" key={`type-key${index}`} value={item}>{ item }</option>
                    })}
            </select>
        </div>

        <div>
            <label htmlFor="sort" className="block mb-2 text-mb font-medium text-white">
                Sort By
            </label>
            <select 
                { ...fieldSort } // import มาจาก useSearchForm() แล้วเอามาใส่ใน form
                id="sort" 
                className="capitalize bg-[#253641] border border-gray-300 text-white text-sm rounded-lg focus:ring-[#395CAB] focus:border-[#395CAB] block w-full p-2.5"
            >
                    { sortList.map((item, index) => { // เอาของใน optionList มา .map ใหม่ ถ้าใช้ .map ต้องใส่ key ให้ด้วย และ value จะได้เอาไว้เรียกใช้ตอนเป็น array
                        return <option className="capitalize" key={`sort-key${index}`} value={item}>{ item }</option>
                    })}
            </select>
        </div>

        <div>
            <label htmlFor="generation" className="block mb-2 text-mb font-medium text-white">
                Search
            </label>
            <input {...fieldKeyword} id="generation" className="bg-[#253641] border border-gray-300 text-white text-sm rounded-lg focus:ring-[#395CAB] focus:border-[#395CAB] block w-full p-2.5" />
        </div>

    </form>
  )
}

export default SearchForm
