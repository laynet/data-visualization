import {useRef} from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const Artist = ({artist, handleArtistClick}) => {
  const container = useRef(null);
  const itemsRef = useRef([])

 

  useGSAP(() => {
    const items = gsap.utils.toArray(itemsRef.current);
    gsap.to(items, {
        x: 500,
        duration: 10,
        rotation: 360,
        ease: "bounce.out"
      });
}, {revertOnUpdate: true} )
    console.log(artist)
  return (
    <div ref={container}>
      <h2>Artists: </h2>
    {artist.map((artist, index) => (
        <p className="artist-box" key={index} onClick={() => handleArtistClick(artist)} ref={(el) => (itemsRef.current[index] = el)}>{artist}</p>
    ))}
    </div>
    
  )
}

export default Artist
