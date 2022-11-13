import React from "react";

// Input: liked: boolean
// Output: onClick
//when the user clicks on the heart icon, the liked property of the movie object is toggled
// whenever we click on the heart icon, the onClick event handler is called

// class Like extends Component {
//     state = {

//     };
//     render() {
//         let classes = "fa fa-heart";
//         if (!this.props.liked) classes += "-o";
//         return (
//         <i
//             onClick={this.props.onClick}
//             style={{ cursor: "pointer" }}
//             className={classes}
//             aria-hidden="true"
//         />
//         );
//     }
// }

function Like(props) {
    let classes = "fa fa-heart";
        if (!props.liked) classes += "-o";
     return (
        <i
            onClick={props.onClick}
            style={{ cursor: "pointer" }}
            className={classes}
            aria-hidden="true"
        />
        );
    
}
    
export default Like;