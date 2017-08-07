import React from 'react'
import {mount} from 'enzyme'
import Avatar from '../component/avatar/'

describe('Avatar', () => {
  test('should set image src to profile avatar', () => {
    let mockProfile = { avatar: 'yep.jpg' }
    let wrapper = mount(<Avatar profile={mockProfile} />)
    expect(wrapper.html()).toEqual('<img class="avatar" src="/yep.jpg">')
  })
})
