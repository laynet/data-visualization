import {useRef} from 'react'
import  gsap  from "gsap";
const WorkingAnimationOnClick = ({clickedPlace}) => {
    const boxRef = useRef(null);
const clickBitch = () => {
    console.log(clickedPlace)
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
    <div className="title-box" ref={boxRef} >{clickedPlace}</div>
    </>
  )
}

export default WorkingAnimationOnClick
