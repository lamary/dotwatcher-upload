import React, { Component } from 'react';
import Router from 'next/router'

class DeleteResults extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete = async () => {
    const result = await fetch(`/api/delete-results?id=${this.props.race.id}`, {
      method: 'POST'
    });
    const response = await result.json()

    if (response.status === 200) {
      Router.push(`/race/${this.props.race.id}`)
      window.scrollTo(0, 0)
    }
  }

  handleConfirm = () => {
    document.getElementById('delete-button').classList.toggle('dn')
    document.getElementById('delete-confirm').classList.toggle('dn')
  }

  render() {
    return (
      <React.Fragment>
        <button id="delete-button" className="input-reset ba bw1 b--red bg-red hover-bg-dark-red white ttn f4 fw4 pv1 ph2 mr4" onClick={this.handleConfirm}>Delete all results</button>
        <button id="delete-confirm" className="input-reset dn ba bw1 b--red bg-red hover-bg-dark-red white ttn f4 fw4 pv1 ph2 mr4" onClick={this.handleDelete}>Are you sure?</button>
      </React.Fragment>
    )
  }
}

export default DeleteResults
