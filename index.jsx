import React from 'react';
import ReactDOM from 'react-dom';
import apartments from '!json!./apartment.json';

require('./styles/apartments.scss');

console.log(apartments);

class ApartmentCard extends React.Component {
  render() {
    return (
      <div className={"apartment-card"}>
        <div className="image-preview">
          <img src={"images/" + this.props.image} />
        </div>
        <div className="details">
          <div className="heading">
            <a href={"/apartment/" + this.props.id}>{this.props.name}</a>
            <hr/>
          </div>
          <div className="description">
            {this.props.description}
          </div>
          <div className="price-group">
            <div className="price-label price-from">From</div>
            <div className="price">${this.props.price}</div>
            <div className="price-label price-unit">USD / Month</div>
          </div>
        </div>
      </div>
    )
  }
}

class Apartments extends React.Component {
  render() {
    var apartmentCards = _.map(this.props.apartments, function(apartment, index) {
      return (
        <ApartmentCard key={apartment.id}
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

class SearchResults extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sortPopularity: true,
      apartments: apartments.apartments
    }
  }

  render() {
    return (
      <div className="search-results">
        <div className="search-title">
          Minneapolis, MN: {this.state.apartments.length} Apartments
        </div>
        <div className="sorting-controls">
          <div onClick={this.handleSort.bind(this)} className={!this.state.sortPopularity && "active"} data-sort-type="price">Price</div>
          <div onClick={this.handleSort.bind(this)} className={this.state.sortPopularity && "active"} data-sort-type="popularity">Popularity</div>
        </div>
        <div className="clear"></div>
        <Apartments apartments={this.state.apartments}/>
      </div>
    )
  }

  handleSort(e) {
    var me = this,
        sortByPopularity = $(e.target).data('sort-type') == 'popularity',
        sortedApartments = _.sortBy(this.state.apartments, function(apartment) {
          if (sortByPopularity) {
            return apartment.popularity;
          } else {
            return apartment.price;
          }
        });

    if (sortByPopularity) {
      this.setState({sortPopularity: true, apartments: sortedApartments});
    } else {
      this.setState({sortPopularity: false, apartments: sortedApartments});
    }
  }
}
 
ReactDOM.render(<SearchResults/>, document.getElementById('root'));
