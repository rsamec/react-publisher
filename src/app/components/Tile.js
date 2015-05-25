import  React from 'react';
import {Link} from 'react-router';

let Tile = React.createClass({
    render() {
        var src = 'assets/images/' + this.props.params.name + '.png';

        return (

            <div className='tile-content'>
                <Link to="printView" params={this.props.params}>
                    <div>{this.props.title}</div>
                    <img src={src} />
                </Link>
            </div>

        );
    }
});

export default Tile;
