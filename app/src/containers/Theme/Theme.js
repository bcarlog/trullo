import React from 'react'
import { connect } from 'react-redux'
import { getConfigState } from '../../store/selectors'

const LightTheme = React.lazy(() => import('./ThemeLight'));
const DarkTheme = React.lazy(() => import('./ThemeNight'));

const ThemeSelector = ({ children, theme }) => {
    return (
        <>
            <React.Suspense fallback={<></>}>
                {(theme === 'light') && <LightTheme />}
                {(theme === 'night') && <DarkTheme />}
            </React.Suspense>
            {children}
        </>
    )
}

const mapStateToProps = (state) => ({
    theme: getConfigState(state).theme
})

export default connect(mapStateToProps)(ThemeSelector)