import React from 'react'
import Gif from 'components/Gif'
import { useSingleGif } from 'hooks/useSingleGif'
import { Helmet } from 'react-helmet'

export default function Detail ({ params }) {
  const {gif} = useSingleGif({ id: params.id })

  const title = gif ? gif.title : ''

  
  if (!gif) return null

  return <>
      <Helmet>
        <title>{title} || Giffy</title>
        <meta name="description" content={`Detail of   ${title}`} />

      </Helmet>
      <h3 className="App-title">{gif.title}</h3>
      <Gif {...gif} />
    </>
}