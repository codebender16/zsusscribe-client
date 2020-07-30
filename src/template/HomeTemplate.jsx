import React from "react"

class HomeTemplate extends React.Component {
    render(){
        console.log(this.props.children);
        return(
            <div className="px-8 py-12 max-w-full mx-auto">
                {this.props.children}
            </div> 
        )
    }
}

export default HomeTemplate