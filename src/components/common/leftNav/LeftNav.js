import React, {PropTypes} from 'react';
import './LeftNav.css';
import { Link, IndexLink } from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as menuActions from '../../../actions/menuActions';

class LeftNav extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      toggled: {value: true}
    };

    this.toggleMenu = this.toggleMenu.bind(this);

  }


  renderMenuItems(items) {
    if (items.length > 0) {
      return items.map((item, index) => (
        <this.MenuItem key={index} item={item}/>
      ));
    }
    else return [];
  }

  MenuItem ({item}){
    return (
      <li key={item.id}>
        <Link to={item.link} activeClassName="active"><i className={"fa " + item.icon}></i>{item.text}</Link>
        <p>{item.description}</p>
      </li>
    );
  }

  toggleMenu(){
    document.querySelector("#wrapper").classList.toggle("toggled");
    const toggled = !this.state.toggled.value;
    this.setState({ toggled: {value: toggled} });
    this.props.actions.createToggled(this.state.toggled);
  }

  render() {
    const navElements = [
      {
        "id": 0,
        "text": "Home",
        "link": "/",
        "icon": "fa-home"
      },
      {
        "id": 1,
        "text": "O mnie",
        "link": "/about",
        "icon": "fa-user"
      },
      {
        "id": 2,
        "text": "Oferta",
        "link": "/offer",
        "icon": "fa-edit"
      },
      {
        "id": 3,
        "text": "Realizacje",
        "link": "/portfolio",
        "icon": "fa-camera"
      },
      {
        "id": 4,
        "text": "Kontakt",
        "link": "/contact",
        "icon": "fa-send"
      }
    ];
    const menuItems = this.renderMenuItems(navElements);

    return (
      <div id="sidebar-wrapper">
        <div className="sidebar-inner">
          <ul className="sidebar-nav">
            {menuItems}
          </ul>
          <div className="push-area">
            <button onClick={this.toggleMenu} id="showPushMenu"><i className="fa fa-bars"></i></button>
          </div>
        </div>
        {/*<button onClick={toggleMenu} type="button" className="btn btn-default" id="menu-toggle">Toggle Menu</button>*/}
      </div>
    );
  }
}

LeftNav.propTypes = {
  toggled: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return{
    toggled: state.toggled
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(menuActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftNav);
