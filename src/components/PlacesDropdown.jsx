import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

const PlacesDropdown = ({availablePlaces, handleClickedPlace}) => {

    
    
  return (

        <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">Choose a place</Dropdown.Toggle>
                <Dropdown.Menu>
                    {availablePlaces.map((item, index) => (
                        <Dropdown.Item drop="down" as="button" key={index} onClick={() => handleClickedPlace(item)}>
                            {item}
                        </Dropdown.Item>
                    ))}
                
                </Dropdown.Menu>
            </Dropdown>

  )
}

export default PlacesDropdown
