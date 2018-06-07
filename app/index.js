import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './containers/root'
import { store, history, persistor } from './store/configureStore'

render(
	<AppContainer>
		<Root store={store} history={history} persistor={persistor} />
	</AppContainer>,
	document.getElementById('root')
)

if (module.hot) {
	module.hot.accept('./containers/root', () => {
		const NextRoot = require('./containers/root') // eslint-disable-line global-require
		render(
			<AppContainer>
				<NextRoot store={store} history={history} persistor={persistor} />
			</AppContainer>,
			document.getElementById('root')
		)
	})
}
