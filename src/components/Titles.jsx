import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);
const Titles = ({titles, handleTitleClick}) => {
    
  const container = useRef(null);
  const itemsRef = useRef([])


useGSAP(() => {
    const items = gsap.utils.toArray(itemsRef.current);
    gsap.to(items, {
        x: 500,
        duration: 1,
        stagger: 0.5,
      });
}, {revertOnUpdate: true} )


    return (
          <div ref={container}>
            {titles.map((title, index) => (
                <div  className='title-box' key={index} onClick={() => handleTitleClick(title)} ref={(el) => (itemsRef.current[index] = el)}>{title}</div>
            ))}
          </div>
    );
  }

export default Titles
