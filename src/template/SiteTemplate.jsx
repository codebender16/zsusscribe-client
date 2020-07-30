import React from "react"

class SiteTemplate extends React.Component {
    render(){
        console.log("there");
        return(
            <div className="px-8 py-12 max-w-md mx-auto">
                {this.props.children}
            </div> 
        )
    }
}

export default SiteTemplate