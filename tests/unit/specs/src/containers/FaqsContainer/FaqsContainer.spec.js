import Vue from 'vue';
import { shallowMount } from '@vue/test-utils'
import FaqsContainer from '@/containers/FaqsContainer/FaqsContainer.vue';

import {
  Tooling
} from '@@/helpers';


describe('FaqsContainer.vue', () => {
  let localVue, i18n, wrapper, store;

  beforeAll(() => {
    const baseSetup = Tooling.createLocalVueInstance();
    localVue = baseSetup.localVue;
    i18n = baseSetup.i18n;
    store = baseSetup.store;
  });

  beforeEach(() => {
    wrapper = shallowMount(FaqsContainer, {
      localVue,
      i18n,
      store,
      attachToDocument: true
    });
  });

  it('should render correct FAQ contents', () => {
    const linkWrappers = wrapper.findAll('.qa__contents--title')
    var linkWrapper = linkWrappers.at(0);
    linkWrapper.trigger('click')
    expect(wrapper.vm.$data.showFAQs.faq1).toBe(true)

    linkWrapper = linkWrappers.at(1);
    linkWrapper.trigger('click')
    expect(wrapper.vm.$data.showFAQs.faq2).toBe(true)

    linkWrapper = linkWrappers.at(2);
    linkWrapper.trigger('click')
    expect(wrapper.vm.$data.showFAQs.faq3).toBe(true)

    linkWrapper = linkWrappers.at(3);
    linkWrapper.trigger('click')
    expect(wrapper.vm.$data.showFAQs.faq4).toBe(true)

    linkWrapper = linkWrappers.at(4);
    linkWrapper.trigger('click')
    expect(wrapper.vm.$data.showFAQs.faq5).toBe(true)

  });

  describe('FaqsContainer.vue Methods', () => { });
});
