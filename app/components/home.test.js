/* eslint-env jest */
import React from 'react'
import Home from './home'
import { defaultState } from '../reducers/home'
import { mountWithRouter } from '../../internals'

const defaultProps = {
	...defaultState,
	googleApiKey: '',
	weatherApiKey: ''
}

describe('Home', () => {
	it('Should render without error', () => {
		expect(() => {
			mountWithRouter(<Home {...defaultProps} />)
		}).not.toThrow()
	})
})
