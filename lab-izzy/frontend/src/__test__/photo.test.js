import React from 'react';
import {mount} from 'enzyme';
import superagent from 'superagent';
import superagentMocker from 'superaget-mocker';
import appStoreCreate from '../lib/app-store-create.js';
import * as photoActions from '../action/photo-actions.js';
import ConnectedPhoto, {Photo} from '../component/photo';

let mockAPI = superagentMocker(superagent);

let mockPhoto = {
  _id: 'slug',
  url: '/goat.jpg',
  description: 'get your goat on!',
};

describe('Photo', () => {
  test('initial state', () => {

    let wrapper = mount(<Photo photo={mockPhoto} />);
    expect(wrapper.state('editing')).toEqual(false);
  });

  test('click trqash can should invoke phontoDelete with this.props.photo', () => {
    let mockPhotoDelete = jest.fn(() => Promise.resolve());
    let wrapper = mount(<Photo photo={mockPhoto} photoDelete={mockPhotoDelete}/>);
    wrapper.find('.fa-trash-o').simulate('click');
    expect(mockPhotoDelete).toHaveBeenCalledWith(mockPhoto);
  });

  test('click pencil should invoke photoUpdate with this.props.photo', () => {
    let wrapper = mount(<Photo photo={mockPhoto}/>);
    wrapper.find('.fa-pencil').simulate('click');
    expect(wrapper.state('editing')).toEqual(true);
  });
});
