import React from 'react';
import ReactDOM from 'react-dom';
import apartments from '!json!./apartment.json';

require('./styles/apartments.scss');

console.log(apartments);

class ApartmentCard extends React.Component {
  render() {
    return (
      <div className={"apartment-card " + (this.props.selected ? "selected" : "")}>
        <div className="image-preview">
          <img src={"images/" + this.props.image} />
        </div>
        <div className="details">
          <a href={"/apartment/" + this.props.id}>{this.props.name}</a>
          <div className="description">
            {this.props.description}
          </div>
          <div className="price-group">
            <div className="price-label price-from">From</div>
            <div className="price">${this.props.price}</div>
            <div className="price-label price-unit">USD / Month</div>
          </div>
        </div>
        {/*<h1>{this.props.name}</h1>*/}
      </div>
    )
  }
}

class Apartments extends React.Component {
  render() {
    var apartmentCards = _.map(apartments.apartments, function(apartment, index) {
      return (
        <ApartmentCard key={apartment.id}
          selected={index == 0}
          id={apartment.id}
          name={apartment.name}
          image={apartment.image}
          price={apartment.price}
          popularity={apartment.popularity}
          description={apartment.description}
        />
      )
    })

    return (
      <div className="apartments">{apartmentCards}</div>
    )
  }
}
 
ReactDOM.render(<Apartments/>, document.getElementById('root'));
