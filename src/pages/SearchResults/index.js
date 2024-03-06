import React, { useCallback } from 'react'
import Spinner from 'components/Spinner'
import ListOfGifs from 'components/ListOfGifs'
import {useGifs} from 'hooks/useGifs'
import useNearScreen from 'hooks/useNearScreen'
import debounce from 'just-debounce-it'
import {Helmet} from 'react-helmet'
import SearchForm from 'components/SearchForm'

export default function SearchResults ({ params }) {
  const { keyword, rating = 'g' } = params
  const { loading, gifs, setPage } = useGifs({ keyword, rating })
  const externalRef = React.useRef(null)
  const {isNearScreen} = useNearScreen({
    externalRef: loading ? null : externalRef, mustDisconnect: false
  })
   
  // const handleNextPage = () => {
  //   console.log('handleNextPage');
  //   // setPage(prevPage => prevPage + 1)
  // }

  const debounceHandleNextPage = useCallback(debounce(	
    () => {
      setPage(prevPage => prevPage + 1)
      console.log('handleNextPage');
    }, 200
  ), [setPage])

  React.useEffect(function () {

    if (isNearScreen) {
      debounceHandleNextPage()
    }
  }, [debounceHandleNextPage, isNearScreen])

  const title = gifs ? `${gifs.length} resultados de ${keyword}` : ''


  return <>
    {loading
      ? <>
        <Helmet>
          <title>Cargando.... || Giffy</title>
          <meta name="description" content="Cargando...." />
        </Helmet>
        <Spinner />
      
      </>
      : <>
        <Helmet>
          <title>{title} || Giffy</title>
          <meta name="description" content={title} />
        </Helmet>
        <SearchForm initialKeyword={keyword} initialRating={rating} />
        <h3 className="App-title">
          {decodeURI(keyword)}
        </h3>
        <ListOfGifs gifs={gifs} />
        <div id="visor" ref={externalRef}></div>
      </>
    }
    <br />
  </>
}