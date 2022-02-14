import React from 'react'
import { connect } from 'react-redux'
import Page from './Ps'

const PsComponent = () => {
	return (
		<Page />
	)
}

const mapStateToProps = () => {
	return{};
}

export default connect(mapStateToProps)(PsComponent)
