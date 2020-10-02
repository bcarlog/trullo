import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import AuthorizationGuard from '../../AuthorizationGuard'

configure({ adapter: new Adapter() })

describe('<AuthorizationGuard />', () => {

    let wrapper

    beforeEach(()=>{
        wrapper = shallow(<AuthorizationGuard path="" exact />)
    })

    it('should render the Component for user authenticated', () => {
        const Component = <div>hello</div>
        wrapper.setProps({component: () => Component, auth: true})
        const componentToRender = shallow(wrapper.props().render())
        
        expect(componentToRender.contains(Component)).toBe(true)
    })

    it('should render other Component for user no-authenticated', () => {
        const Component = <div>this should not showed</div>
        wrapper.setProps({component: () => Component, auth: false})
        const componentToRender = shallow(wrapper.props().render())

        expect(componentToRender.contains(Component)).toBe(false)
    })
})