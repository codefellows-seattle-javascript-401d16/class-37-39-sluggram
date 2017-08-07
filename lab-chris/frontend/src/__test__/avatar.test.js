import React from 'react'
import {mount} from 'enzyme'
import Avatar from '../component/avatar'

describe('Avatar', () => {
  test('should set img source to profile avatar', () => {
    let mockProfile = { avatar: '/cool.jpg' }
    let wrapper = mount(<Avatar profile={mockProfile} />)
    expect(wrapper.html()).toEqual('<div class="avatar"><img src="/cool.jpg"></div>')
  })
})
