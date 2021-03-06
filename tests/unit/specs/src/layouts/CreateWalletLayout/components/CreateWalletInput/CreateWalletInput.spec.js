import Vue from 'vue';
import { shallowMount } from '@vue/test-utils'
import CreateWalletInput from '@/layouts/CreateWalletLayout/components/CreateWalletInput/CreateWalletInput.vue';
import sinon from 'sinon';
import {
  Tooling
} from '@@/helpers';

describe('CreateWalletInput.vue', () => {
  let localVue, i18n, wrapper, store;
  beforeAll(() => {
    const baseSetup = Tooling.createLocalVueInstance();
    localVue = baseSetup.localVue;
    i18n = baseSetup.i18n;
    store = baseSetup.store;
  });

  beforeEach(() => {
    wrapper = shallowMount(CreateWalletInput, {
      localVue,
      i18n,
      store,
      attachToDocument: true,
    });
  });
  it('should render correct value props', () => {
    const value = '100';
    wrapper.setProps({ value });
    expect(wrapper.vm.$el.querySelector('.user-input-field input').value).toEqual(value);
  });

  it('should render correct switcher props', () => {
    let switcher = sinon.stub();
    wrapper.setProps({ switcher });
    wrapper.setProps({ value: '111' })
    wrapper.find('.next-button').trigger('click');
    expect(switcher.called).toBe(true);
  });

  it('should render correct param props', () => {
    let switcher = sinon.stub();
    let param = 'param';
    wrapper.setProps({ switcher });
    wrapper.setProps({ value: '111' })
    wrapper.setProps({ param });
    wrapper.find('.next-button').trigger('click');
    expect(switcher.calledWith(param)).toBe(true);
  });

  it('should render correct strength data', () => {
    let strength = 'strength';
    wrapper.setData({ strength });
    expect(wrapper.vm.$el.querySelector('.passwd-strength span').textContent.trim()).toEqual(strength);
  });

  it('should render correct strengthClass data', () => {
    let strengthClass = 'strengthClass';
    wrapper.setData({ strengthClass });
    expect(wrapper.find('.passwd-strength span').classes().indexOf(strengthClass)).toBeGreaterThan(-1);
  });

  it('should render correct password data', () => {
    let password = { showPassword: true };
    wrapper.setData({ password });
    expect(wrapper.find('img.show-password').exists()).toBe(true);
    expect(wrapper.find('img.hide-password').exists()).toBe(false);
    password = { showPassword: false };
    wrapper.setData({ password });
    expect(wrapper.find('img.show-password').exists()).toBe(false);
    expect(wrapper.find('img.hide-password').exists()).toBe(true);
  });

  describe('CreateWalletInput.vue Methods', () => { });
});
