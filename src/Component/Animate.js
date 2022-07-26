import React, { Component } from 'react'

import { BlinkingCursorTextBuilder } from 'react-animated-text-builders'

class Example extends Component {
  render() {
    return <>
      <BlinkingCursorTextBuilder
      textStyle={{fontWeight :"bold", font : "Times New Roman", fontSize : "18px"}}
      style={{transform: "rotate(-10deg)", marginTop:"10px", marginBottom :"10px"}}
      cursorComponent={<div style={{color : "green"}}> Easy to use!</div>}
      blinkTimeAfterFinish={-1}> Easy! </BlinkingCursorTextBuilder>

      <FloatingLettersTextBuilder
        floatingSpeed={500}
        lettersAppearanceDelay={250}
        animationMaxMargin={"200px"}
        animationMinMargin={"0px"}
        onAnimationFinished={()=> {alert("Animation Finished!")}}
      > Floating Letters </FloatingLettersTextBuilder>
      </>
  }
}