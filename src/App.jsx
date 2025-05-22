import { useState, useEffect, useRef } from 'react'
import  gsap  from "gsap";
import { useGSAP } from "@gsap/react";

import './App.css'

import axios from 'axios'

import PlacesDropdown from './components/PlacesDropdown'
import Boxes from './components/Boxes';
import WorkingAnimationOnClick from './components/WorkingAnimationOnClick';

gsap.registerPlugin(useGSAP);

function App() {
  const [pageNumber, setPageNumber] = useState(1)
  const [artList, setArtList] = useState([])
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [titles, setTitles] = useState([])
  const [currentPlace, setCurrentPlace] = useState('')
  const [displayTitles, setDisplayTitles] = useState(false)
  const [displayArtist, setDisplayArtist] = useState(false)
  const [artist, setArtist] = useState('')
//initial api call and process data
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
            placeOfOrigin: item.place_of_origin,
            imageId: item.image_id,
            title: item.title,
            thumbnail: item.thumbnail,
            artist: item.artist_title,
            description: item.description
        }))       
        setArtList(processData)
        // console.log(processData)
      } catch (error) {
        console.log(error)
      }
    }
    getArtList()   
  }, [pageNumber])

//   formatting the data to populate the drop down that picks the place of origin
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
  
//handling the data when place is picked from dropdown

  const handlePlace = (place) => {
    console.log("clicked :", place)
    // console.log(artList)
    const titleList = []
    for(let i = 0; i < artList.length; i++){
        if(artList[i].placeOfOrigin === place){
            titleList.push(artList[i].title)
        }
    }
    setCurrentPlace(place)
    setTitles(titleList)
    setDisplayTitles(true)   
}

const handleBoxClick = (title) => {

    const currArtist = []
    for(let i = 0; i < artList.length; i++){
        let whatever = artList[i]
        if(whatever.title === title){
            currArtist.push(whatever.artist)
        }
    }
    setArtist(currArtist[0])
    setDisplayArtist(true)
    setDisplayTitles(false)
}

//test function with onclick 
// const boxRef = useRef(null);
const killMe = () => {
    console.log(artist)
}




//GSAP FUCKERY
// const container = useRef();
    
// const tl = useRef();

//   useGSAP(() => {
//     tl.current = gsap
//       .timeline()
//       .to(".box", {
//         rotate: 360
//       })
//       .to(".circle", {
//         x: 100
//       });
//   }, { scope: container });


// useGSAP(() => {
//     gsap.to(boxRef.current, {
//         x: 600,
//         duration: 3,
//     }
// )
// })


  return (
    <>

      <div className="card">
        <div>
           <PlacesDropdown availablePlaces={availablePlaces} handlePlace={handlePlace}/>
        </div>
 
        <button onClick={killMe}>
          KILL ME
        </button>
        {/* <pre>{JSON.stringify(artList[0], null, 2)}</pre> */}
        {displayTitles && 
        <div>
        <h1>Works of art from {currentPlace}</h1>
        <Boxes titles={titles} handleBoxClick={handleBoxClick}/>
        </div>
        }
        {displayArtist && 
        <h1>{artist}</h1>
        }
        </div>
    </>
  )
}

export default App
