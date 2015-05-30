import  React from 'react';
import {Link} from 'react-router';

let Tile = React.createClass({
    //getInitialState() {
    //    return {
    //        show: false
    //    }
    //},
    //showTooltip(){
    //   this.setState({show:true})
    //},
    //hideTooltip(){
    //    this.setState({show:false})
    //},
    render() {
        var src = 'assets/images/' + this.props.params.name + '.png';

        //var style = {display:this.state.show?'':'none'};
        return (
            <div className='tile-content'>
                <Link to="printView" params={this.props.params}>
                    <div className='tile-title'>{this.props.title}</div>
                    <img className='tile-image' src={src}/>
                </Link>
            </div>
        );
    }
});

export default Tile;
