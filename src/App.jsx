import { useState, useEffect, useRef } from 'react'
import  gsap  from "gsap";
import { useGSAP } from "@gsap/react";

import './App.css'

import axios from 'axios'

import PlacesDropdown from './components/PlacesDropdown'
import Titles from './components/Titles';
import WorkingAnimationOnClick from './components/WorkingAnimationOnClick';
import Category from './components/Category';
import Type from './components/Type';
import Artist from './components/Artist';

gsap.registerPlugin(useGSAP);

function App() {
  const [pageNumber, setPageNumber] = useState(1)
  const [artList, setArtList] = useState([])
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [titles, setTitles] = useState([])
  const [clickedPlace, setClickedPlace] = useState('')
  const [displayTitles, setDisplayTitles] = useState(false)
  const [displayArtistAndCategory, setDisplayArtistAndCategory] = useState(false)
  const [artistAndCategory, setArtistAndCategory] = useState({})
  const [category, setCategory] = useState({})
  const [displayType, setDisplayType] = useState(false)
  const [type, setType] = useState([])
  const [displayArtist, setDisplayArtist] = useState(false)
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
        console.log(processData)
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
            set.add(place)
        }
        let places = Array.from(set)
        setAvailablePlaces(places)
      }
    populatePlacesDropdown(artList)
  }, [artList])
  
//handling the data when place is picked from dropdown
  const handleClickedPlace = (place) => {
    console.log("clicked :", place)
    const titleList = []
    for(let i = 0; i < artList.length; i++){
        if(artList[i].placeOfOrigin === place){
            titleList.push(artList[i].title)
        }
    }
    setClickedPlace(place)
    setTitles(titleList)
    setDisplayTitles(true)   
}

const handleTitleClick = (title) => {

    const currCategory = []
    for(let i = 0; i < artList.length; i++){
        let curr = artList[i]
        if(curr.title === title){
            currCategory.currArtist = curr.artist 
            currCategory.category = curr.category
        }
    }
    setArtistAndCategory(currCategory)
    setDisplayArtistAndCategory(true)
    setDisplayTitles(false)

}

const handleCategoryClick = (category) => {
    const currCategoryCollection = []
    console.log("CLICKED CATEGORy ",category)
    for(let i = 0; i < artList.length; i++){
        let curr = artList[i]
        if(curr.category.length === 1 && curr.category === category){
            currCategoryCollection.push(curr.type)
        }
        else if(curr.category.length > 1){
            for(const cat of curr.category){
                if(cat === category){
                    currCategoryCollection.push(curr.type) 
                }
            }
        }
    }
    setCategory(currCategoryCollection)
    console.log("Cat collection ", currCategoryCollection)
    setDisplayType(true)
    setDisplayArtistAndCategory(false)
}

const handleTypeClick = (type) => {
    console.log("handleTypeClick ", type)
    const currType = []
    for(let i = 0; i < artList.length; i++){
        let curr = artList[i]
        if(curr.type === type){
            console.log(curr)
            currType.push(curr.artist)
        }
    }
    setType(currType)
    setDisplayArtist(true)
    setDisplayType(false)
    console.log("CURRTYPE ",currType)
  }

  const handleArtistClick = (artist) => {
    console.log(artist)
  }

//test function with onclick 
// const boxRef = useRef(null);
// const killMe = () => {
//     console.log(artistAndCategory)
// }





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
           <PlacesDropdown availablePlaces={availablePlaces} handleClickedPlace={handleClickedPlace}/>
        </div>
 
        {/* <button onClick={killMe}>
          KILL ME
        </button> */}
        {/* <pre>{JSON.stringify(artList[0], null, 2)}</pre> */}
        {displayTitles && 
        <div>
        <h1>Works of art from {clickedPlace}</h1>
        <Titles titles={titles} handleTitleClick={handleTitleClick}/>
        </div>
        }
        {displayArtistAndCategory && 
        <Category artistAndCategory={artistAndCategory} handleCategoryClick={handleCategoryClick}/>
        }
        {displayType &&
        <Type type={category} handleTypeClick={handleTypeClick}/>
}
{displayArtist && 
<Artist artist={type} handleArtistClick={handleArtistClick}/>
}
        </div>
    </>
  )
}

export default App
