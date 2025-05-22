import {useRef} from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const Type = ({type, handleTypeClick}) => {
  const container = useRef(null);
  const itemsRef = useRef([])

  
  useGSAP(() => {
    const items = gsap.utils.toArray(itemsRef.current);
    gsap.to(items, {
        x: 500,
        duration: 5,
        rotation: 360,
        ease: "back.out"
      });
}, {revertOnUpdate: true} )

  return (
    <div ref={container}>
      <h2>Choose a Type: </h2>
    {type.map((type, index) => (
        <p className="type-box" key={index} onClick={() => handleTypeClick(type)} ref={(el) => (itemsRef.current[index] = el)}>{type}</p>
    ))}
    </div>
  )
}

export default Type
