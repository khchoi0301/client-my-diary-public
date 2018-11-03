// import React from "react";
// import { render } from "react-dom";
// import {
//   Link,
//   DirectLink,
//   Element,
//   Events,
//   animateScroll as scroll,
//   scrollSpy,
//   scroller
// } from "react-scroll";

// const styles = {
//   fontFamily: "sans-serif",
//   textAlign: "center"
// };

// class Section extends React.Component {
//   constructor(props) {
//     super(props);
//     this.scrollToTop = this.scrollToTop.bind(this);
//   }

//   componentDidMount() {
//     Events.scrollEvent.register("begin", function () {
//       console.log("begin", arguments);
//     });

//     Events.scrollEvent.register("end", function () {
//       console.log("end", arguments);
//     });
//   }
//   scrollToTop() {
//     scroll.scrollToTop();
//   }
//   scrollTo() {
//     scroller.scrollTo("scroll-to-element", {
//       duration: 800,
//       delay: 0,
//       smooth: "easeInOutQuart"
//     });
//   }
//   scrollToWithContainer() {
//     let goToContainer = new Promise((resolve, reject) => {
//       Events.scrollEvent.register("end", () => {
//         resolve();
//         Events.scrollEvent.remove("end");
//       });

//       scroller.scrollTo("scroll-container", {
//         duration: 800,
//         delay: 0,
//         smooth: "easeInOutQuart"
//       });
//     });

//     goToContainer.then(() =>
//       scroller.scrollTo("scroll-container-second-element", {
//         duration: 800,
//         delay: 0,
//         smooth: "easeInOutQuart",
//         containerId: "scroll-container"
//       })
//     );
//   }
//   componentWillUnmount() {
//     Events.scrollEvent.remove("begin");
//     Events.scrollEvent.remove("end");
//   }
//   render() {
//     return (
//       <div>


//         <div id="anchor" className="element">
//           test 6 (anchor)
//         </div>

//         <Element
//           name="test7"
//           className="element"
//           id="containerElement"
//           style={{
//             position: "relative",
//             height: "200px",
//             overflow: "scroll",
//             marginBottom: "100px"
//           }}
//         >
//           <Element
//             name="firstInsideContainer"
//             style={{
//               marginBottom: "200px"
//             }}
//           >
//             first element inside container
//           </Element>

//           <Element
//             name="secondInsideContainer"
//             style={{
//               marginBottom: "200px"
//             }}
//           >
//             second element inside container
//           </Element>
//         </Element>

//         <Element id="same" className="element">
//           Two links point to this
//         </Element>

//         <Element name="scroll-to-element" className="element">
//           Scroll to element
//         </Element>

//         <Element
//           className="element"
//           id="scroll-container"
//           style={{
//             position: "relative",
//             height: "200px",
//             overflow: "scroll",
//             marginBottom: "100px"
//           }}
//         >
//           <Element
//             name="scroll-container-first-element"
//             style={{
//               marginBottom: "200px"
//             }}
//           >
//             first element inside container
//           </Element>

//           <Element
//             name="scroll-container-second-element"
//             style={{
//               marginBottom: "200px"
//             }}
//           >
//             second element inside container
//           </Element>
//         </Element>

//         <a onClick={this.scrollToTop}>To the top!</a>
//       </div>
//     );
//   }
// }

// render(<Section />, document.getElementById("root"));
