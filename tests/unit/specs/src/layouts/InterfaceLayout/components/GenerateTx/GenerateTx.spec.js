import Vue from 'vue';
import Vuex from 'vuex';
import { shallowMount, mount } from '@vue/test-utils'
import GenerateTx from '@/layouts/InterfaceLayout/components/GenerateTx/GenerateTx.vue';
import CurrencyPicker from '@/layouts/InterfaceLayout/components/CurrencyPicker/CurrencyPicker.vue';
import TxSpeedInput from '@/layouts/InterfaceLayout/components/TxSpeedInput/TxSpeedInput.vue';
import SignedTxModal from '@/layouts/InterfaceLayout/components/SignedTxModal/SignedTxModal.vue';
import PopOver from '@/components/PopOver/PopOver.vue';
import nodeList from '@/networks';
import url from 'url';
import Web3 from 'web3';
import {
  Tooling
} from '@@/helpers';


describe('GenerateTx.vue', () => {
  let localVue, i18n, wrapper, store;

  const gasLimit = 1000;
  const nonce = 1;
  const toData = 120;

  beforeAll(() => {
    const baseSetup = Tooling.createLocalVueInstance();
    localVue = baseSetup.localVue;
    i18n = baseSetup.i18n;
    store = baseSetup.store;
    Vue.config.warnHandler = () => { };

    const network = nodeList['ETH'][3];
    const hostUrl = url.parse(network.url);
    const newWeb3 = new Web3(
      `${hostUrl.protocol}//${hostUrl.hostname}:${network.port}${
      hostUrl.pathname
      }`
    );

    let account = {
      balance: {
        result: ''
      }
    }

    let getters = {
      account: () => {
        return account
      },
      web3: () => {
        return newWeb3
      }
    }


    store = new Vuex.Store({
      getters,
    });

  });

  beforeEach(() => {
    // store.replaceState({
    //    account: {
    //      balance: {
    //        result:''
    //      }
    //    } 
    //  })
    wrapper = mount(GenerateTx, {
      localVue,
      i18n,
      store,
      attachToDocument: true,
      stubs: {
        'tx-speed-input': TxSpeedInput,
        'popover': PopOver,
        'signed-tx-modal': SignedTxModal
      },
      propsData: { gasLimit, nonce }
    });
  });

  it('should render correct propsData', () => {
    var inputElements = wrapper.vm.$el.querySelectorAll('.gas-amount input')
    expect(inputElements[2].value).toEqual(String(nonce))
    expect(inputElements[3].value).toEqual(String(gasLimit))
  });

  it('should render correct toAmt', () => {
    wrapper.setData({ toAmt: 100, toData })
    expect(wrapper.vm.$el.querySelector('.send-form .amount-number input').value).toEqual(String(wrapper.vm.$data.toAmt))
    expect(wrapper.findAll('.error-message-container').length).toEqual(1)
  })

  it('should render correct toData', () => {
    wrapper.setData({ toAmt: 100, toData })
    var inputElements = wrapper.vm.$el.querySelectorAll('.gas-amount input')
    expect(inputElements[0].value).toBe(String(wrapper.vm.$data.toData))
  })

  it('should render correct coinType', () => {
    const currencyElements = wrapper.vm.$el.querySelectorAll('.item-container div');
    for (var i = 0; i < currencyElements.length; i++) {
      const currencyElement = currencyElements[i];
      if (i > 0) {
        const symbol = wrapper.vm.$data.coinType[i - 1].symbol;
        const name = wrapper.vm.$data.coinType[i - 1].name;
        expect(currencyElement.querySelector('p').textContent.trim()).toEqual(symbol + " - " + name)
        expect(currencyElement.querySelector('span').textContent.trim()).toEqual("- " + name)
      }
    }

  })

  describe('GenerateTx.vue Methods', () => {
    it('should emit pathUpdate when button click', () => {
      // wrapper.find('.generate-info .close-button').trigger('click')
      // expect(wrapper.emitted().pathUpdate).toBeTruthy();


      //       let browser =  puppeteer.launch({ headless: false, });
      // let page = browser.newPage();

      // const result = await page.evaluate(() => {

      //   wrapper.find('.generate-info .close-button').trigger('click')
      //   expect(wrapper.emitted().pathUpdate).toBeTruthy();
      // });
    });

    it('should emit locNonce update when input changed', () => {
      var inputElement = wrapper.findAll('.gas-amount input').at(2)
      var inputText = 11
      inputElement.setValue(inputText)
      inputElement.trigger('change')
      expect(wrapper.emitted().nonceUpdate).toBeTruthy();
    })

    it('should emit gasLimitUpdate update when input changed', () => {
      var inputElement = wrapper.findAll('.gas-amount input').at(3)
      var inputText = 11
      inputElement.setValue(inputText)
      inputElement.trigger('change')
      expect(wrapper.emitted().gasLimitUpdate).toBeTruthy();
    })
  });
});
