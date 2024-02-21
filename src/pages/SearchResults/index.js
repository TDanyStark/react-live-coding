import React, { useCallback } from 'react'
import Spinner from 'components/Spinner'
import ListOfGifs from 'components/ListOfGifs'
import {useGifs} from 'hooks/useGifs'
import useNearScreen from 'hooks/useNearScreen'
import debounce from 'just-debounce-it'

export default function SearchResults ({ params }) {
  const { keyword } = params
  const { loading, gifs, setPage } = useGifs({ keyword })
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


  return <>
    {loading
      ? <Spinner />
      : <>
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