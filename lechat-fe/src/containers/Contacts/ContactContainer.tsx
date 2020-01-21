import React, {Component} from 'react';
import withSocket from "../../hoc/withSocket";
import ContactList from '../../components/ContactList/ContactList';

class ContactContainer extends Component {
  list = [{name: 'Pippo'}, {name: 'Pluto'}, {name: 'Paperino'}];

  render() {
    return <ContactList list={this.list}></ContactList>
  }
}

export default withSocket(ContactContainer);