import {useRef} from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const Category = ({artistAndCategory, handleCategoryClick}) => {
  const container = useRef(null);
  const itemsRef = useRef([])
  useGSAP(() => {
    const items = gsap.utils.toArray(itemsRef.current);
    gsap.to(items, {
        x: 500,
        duration: 1,
        rotation: 360,
      });
}, {revertOnUpdate: true} )
    console.log(artistAndCategory)
  return (
    <div>
    <h1 >Artist: {artistAndCategory.currArtist}</h1>
    <div ref={container}>
      <h2>Choose a Category: </h2>
    {artistAndCategory.category.map((category, index) => (
        <p className="category-box" key={index} onClick={() => handleCategoryClick(category)} ref={(el) => (itemsRef.current[index] = el)}>{category}</p>
    ))}
    </div>
    </div>
  )
}

export default Category

