import React from 'react'
import Spinner from 'components/Spinner'
import ListOfGifs from 'components/ListOfGifs'
import {useGifs} from 'hooks/useGifs'
import useNearScreen from 'hooks/useNearScreen'

export default function SearchResults ({ params }) {
  const { keyword } = params
  const { loading, gifs, setPage } = useGifs({ keyword })
  const externalRef = React.useRef(null)
  const {isNearScreen} = useNearScreen({
    distance: '100px', externalRef: loading ? null : externalRef, mustDisconnect: false
  })


  React.useEffect(function () {
    const handleNextPage = () => {
      console.log('handleNextPage');
      setPage(prevPage => prevPage + 1)
    }

    if (isNearScreen) {
      handleNextPage()
    }
  }, [isNearScreen, setPage])


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