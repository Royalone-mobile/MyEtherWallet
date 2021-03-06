import Vue from 'vue';
import { shallowMount } from '@vue/test-utils'
import SendTx from '@/layouts/InterfaceLayout/components/SendTx/SendTx.vue';
import sinon from 'sinon'
import {
  Tooling
} from '@@/helpers';

describe('SendTx.vue', () => {
  let localVue, i18n, wrapper, store;

  const signedTx = 'signedTx'
  const rawTx = { data: 'rawTx' }
  const spy = sinon.stub()

  beforeAll(() => {
    const baseSetup = Tooling.createLocalVueInstance();
    localVue = baseSetup.localVue;
    i18n = baseSetup.i18n;
    store = baseSetup.store;
  });

  beforeEach(() => {
    wrapper = shallowMount(SendTx, {
      localVue,
      i18n,
      store,
      attachToDocument: true,
      propsData: {
        signedTx: signedTx,
        rawTx: rawTx,
        pathUpdate: spy()
      }
    });
  });

  it('should render correct rawTx props', () => {
    expect(JSON.stringify(wrapper.vm.$data.signedTx)).toEqual(JSON.stringify(rawTx));
  });

  it('should render correct signedTx data', () => {
    const signedTx = 'signedTx';
    wrapper.setData({ signedTx });
    expect(wrapper.vm.$el.querySelector('.wrap  .gas-amount textarea').value).toEqual(signedTx);
  });

  describe('SendTx.vue Methods', () => {
    it('should clear signedTx when button clicked', () => {
      const signedTx = 'signedTx';
      wrapper.setData({ signedTx });
      wrapper.findAll('.form-controller p').at(0).trigger('click');
      expect(wrapper.vm.$data.signedTx).toEqual('');
    })
  });
});
