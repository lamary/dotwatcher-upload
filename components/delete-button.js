import React, { Component } from 'react';
import Router from 'next/router'

class DeleteResults extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete = async () => {
    // deleteType can be results or race
    const result = await fetch(`/api/delete-${this.props.deleteType}?id=${this.props.race.id}`, {
      method: 'POST'
    });
    const response = await result.json()

    if (response.status === 200) {
      Router.push(this.props.deleteType === 'results' ? `/race/${this.props.race.id}` : '/races')
      window.scrollTo(0, 0)
    }
  }

  handleConfirm = event => {
    event.target.classList.toggle('dn')
    document.getElementById(`delete-confirm-${this.props.race.id}`).classList.toggle('dn')
  }

  render() {
    return (
      <React.Fragment>
        <button id={`delete-button-${this.props.race.id}`} className="input-reset ba bw1 b--red bg-red hover-bg-dark-red white ttn f4 fw4 pv1 ph2" onClick={this.handleConfirm}>Delete { this.props.deleteType === 'results' ? 'all results' : 'race' }</button>
        <button id={`delete-confirm-${this.props.race.id}`} className="input-reset dn ba bw1 b--red bg-red hover-bg-dark-red white ttn f4 fw4 pv1 ph2" onClick={this.handleDelete}>Are you sure?</button>
      </React.Fragment>
    )
  }
}

export default DeleteResults
