import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from 'react';

export default function Pokemon() {
  const { data, isError, isSuccess, isLoading } = useQuery(['pokemon'],
    () => axios.get('https://pokeapi.co/api/v2/pokemon')
      .then((res) => res.data.results))

  if (isLoading) return <>Loading......</>

  if (isError) return <>404</>

  return <div>{isSuccess && data?.map(
    (pokemon: any) => <div key={pokemon.name}>{pokemon.name}</div>)
  }</div>
}