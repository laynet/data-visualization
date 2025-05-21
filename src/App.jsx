import { useState, useEffect } from 'react'
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

import './App.css'
import axios from 'axios'

import PlacesDropdown from './components/PlacesDropdown'

function App() {
//   const [count, setCount] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [artList, setArtList] = useState([])
  const [availablePlaces, setAvailablePlaces] = useState([])
//   const [placeOfOrigin, setPlaceOfOrigin] = useState([])
  useEffect(() => {
    const getArtList = async () => {
      try {
        // const { data } = await axios.get(`https://api.artic.edu/api/v1/artworks?&limit=100`)
        const {data} = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${pageNumber}&limit=100`)
        const totalData = data.data
        // console.log(totalData)
        const processData = totalData.map(item => ({
            id: item.id,
            type: item.artwork_type_title,
            category: [...item.category_titles],
            placeOfOrigin: item.place_of_origin
        }))
        
        setArtList(processData)
        
    
        // const { data } = await axios.get(`https://api.artic.edu/api/v1/artworks/search?q={placeOfOrigin}?page=${pageNumber}&limit=100`)
        // const { data } = await axios.get(`https://api.artic.edu/api/v1/artworks/search?&query[term][place_of_origin]=${placeOfOrigin}?page=${pageNumber}&limit=100`)
        // const { data } = await axios.get(`https://api.artic.edu/api/v1/artworks/36417`)
        // setArtList(data.data)
        // console.log("%%%%%%%",data.data.place_of_origin)
        // console.log("!!!",response)
        // setArtList(data)
        // console.log("!!!",data)
      } catch (error) {
        console.log(error)
      }

    }
    getArtList()
    
  }, [pageNumber])
  useEffect(() => {
    const populatePlacesDropdown = (artList) => {
        let set = new Set()
        for(let i = 0; i < artList.length; i++){
            let place = artList[i].placeOfOrigin
            if(place) set.add(place)
            else set.add("NOWHERE")
            //if i need to attach an id to the places this is the code, but i think i can get the data by searching for the place
            // let placeId = artList[i].id
            // if(place)set.add({place: place, id: placeId})
            // else set.add({place: 'No place available', id: placeId})
        }
        let places = Array.from(set)
        // console.log(places)
        setAvailablePlaces(places)
      }
    populatePlacesDropdown(artList)
  }, [artList])
  



  return (
    <>

      <div className="card">
        <div>
           <PlacesDropdown availablePlaces={availablePlaces} />
        </div>
        {/* <button onClick={killMe}>
          count is {count}
        </button> */}
        {/* <pre>{JSON.stringify(artList[0], null, 2)}</pre> */}
        </div>
      {/* <Doughnut data={place}/> */}
    </>
  )
}

export default App
