import React from 'react'
import chai, {expect} from 'chai'
import {spy} from 'sinon'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Login} from '../../app/components/Login'
const shallow = Enzyme.shallow
chai.use(require('chai-enzyme')())
chai.use(require('sinon-chai'))
Enzyme.configure({ adapter: new Adapter() })

/* global describe it beforeEach */
describe('<Login />', () => {
  let root
  beforeEach('render the root', () =>
    root = shallow(<Login/>)
  )

  it('shows a login form', () => {
    expect(root.find('input[name="username"]')).to.have.length(1)
    expect(root.find('input[name="password"]')).to.have.length(1)
  })

  it('shows a password field', () => {
    const pw = root.find('input[name="password"]')
    expect(pw).to.have.length(1)
    expect(pw.at(0)).to.have.attr('type').equals('password')
  })

  it('has a login button', () => {
    const submit = root.find('input[type="submit"]')
    expect(submit).to.have.length(1)
  })

  describe('when submitted', () => {
    const login = spy()
    const root = shallow(<Login login={login}/>)
    const submitEvent = {
      preventDefault: spy(),
      target: {
        username: {value: 'bones@example.com'},
        password: {value: '12345'},
      }
    }

    beforeEach('submit', () => {
      login.reset()
      submitEvent.preventDefault.reset()
      root.simulate('submit', submitEvent)
    })

    it('calls props.login with credentials', () => {
      expect(login).to.have.been.calledWith(
        submitEvent.target.username.value,
        submitEvent.target.password.value,
      )
    })

    it('calls preventDefault', () => {
      expect(submitEvent.preventDefault).to.have.been.called
    })
  })
})
