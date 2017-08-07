import React from 'react';
import {shallow, mount} from 'enzyme';
import PhotoForm from '../component/photo-form';

describe('PhotoForm', () => {
  test('initial state without props', () => {
    let wrapper = mount(<PhotoForm />);
    expect(wrapper.state('description')).toBe('');
    expect(wrapper.state('preview')).toBe('');
    expect(wrapper.state('photo')).toBe(null);
  });

  test('initial state with props', () => {
    let mockPhoto = {
      _id: 'izzyb',
      url: '/izzy.jpg',
      description: 'must love goats',
    };

    let wrapper = mount(<PhotoForm photo={mockPhoto}/>);
    expect(wrapper.state()).toEqual(mockPhoto);
  });

  test('description input can update state', () => {
    let wrapper = mount(<PhotoForm />);
    wrapper.find('input[name="description"]').simulate('change', {
      target: {
        name: 'description',
        value: 'the kids are alright',
      },
    });

    expect(wrapper.state('description')).toEqual('the kids are alright');
  });

  test('file input should be able to update the state', () => {
    let wrapper = mount(<PhotoForm />);
    let mockFile = {
      filename: 'izzy.jpg',
      type: 'image/jpg',
      size: '1kb',
    };
    wrapper.find('input[name="photo"]').simulate('change', {
      target: {
        name: 'photo',
        files: [mockFile],
      },
    });

    expect(wrapper.state('photo')).toEqual(mockFile);
  });

  test('submit event should invoke onComplete with state', () => {
    let mockOnComplete = jest.fn(() => Promise.resolve());
    let mockState = {
      photo: {},
      description: 'yasssss',
      preview: 'kween',
    };

    let wrapper = mount(<PhotoForm onComplete={mockOnComplete}/>);
    wrapper.setState(mockState);
    wrapper.find('form').simulate('submit');
    expect(mockOnComplete).toHaveBeenCalledWith(mockState);
  });

  test('button name should say what i want', () => {
    let mockButtonName = 'YEEEYEEE!';
    let wrapper = mount(<PhotoForm buttonName={mockButtonName}/>);
    expect(wrapper.find('button').text()).toEqual(` ${mockButtonName} `);
  });
});
