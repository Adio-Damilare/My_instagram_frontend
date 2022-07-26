import React from 'react';
import styled from 'styled-components'

const Popup = () => {
    return (
        <PopupWrapper>
            <PopupTitle>Welcome to our website</PopupTitle>
            <div>
                Upmostly is a great website to help you to learn React and Javascript.
            </div>
        </PopupWrapper>
    )
}
function App() {
    return (
      <>
          <StyledParagraph>
          "Lorem ipsum dolor sit amet...."
        </StyledParagraph>
        <StyledParagraph>
          "Lorem ipsum dolor sit amet...."
        </StyledParagraph>
        <PopupBackground/>
        <Popup />
      </>
  
    )
  }
  const PopupBackground = styled.div`
  width:100vw;
  height:100vh;
  background-color:#ffff;
  opacity:0.9;
  position:absolute;
  top:0;
  z-index:5;
  
  `
  const StyledParagraph = styled.p`
  padding:1rem;
  border:1px solid black;
  border-radius:1rem;
  line-height:2rem;
  font-size:1.5rem;`
  
const PopupWrapper = styled.div`
border-radius:1rem;
border:2px solid black;
padding:1rem;
background-color:white;
display:flex;
flex-flow:column nowrap;
align-items:center;
justify-content:space-evenly;
width:20rem;
height:10rem;
position:absolute;
top:calc(50% - 10rem);
right:calc(50% - 10rem);
z-index:10;
`
const PopupTitle = styled.div`
font-size:1.25rem;
font-weight:bold;
margin-bottom:1rem;
`

export default Popup;