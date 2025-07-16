import React, { useEffect, useState } from 'react'
import Config from '../Config';

const Select = ({data, selected}) => {
    const [options, setOptions] = useState([])
    useEffect(()=>{
        getOptions();
    },[])

    const getOptions= async()=>{
        const response = await Config.getCategoriaAll();
        setOptions(response.data)
    }

  return (
    <select className='form-control' value={data} onChange={(e)=> {selected(e.target.value)}}>
  <option value="">-- Selecciona una categoría --</option>
  {
    options.map((option) => (
      <option key={option.id} value={option.id}>
        {option.nombre}
      </option>
    ))
  }
</select>
  )
}

export default Select
