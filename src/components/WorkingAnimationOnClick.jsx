import {useRef} from 'react'
import  gsap  from "gsap";
const WorkingAnimationOnClick = ({currentPlace}) => {
    const boxRef = useRef(null);
const clickBitch = () => {
    console.log(currentPlace)
    gsap.to(boxRef.current, {
        x: 600,
        duration: 3,
    });
}
  return (
    <>
    <button onClick={clickBitch}>
          CLICK BITCH
        </button>
    <div>WorkingAnimationOnClick</div>
    <div className="title-box" ref={boxRef} >{currentPlace}</div>
    </>
  )
}

export default WorkingAnimationOnClick
