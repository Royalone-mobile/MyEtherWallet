import Web3 from 'web3';
const web3 = new Web3(window.web3.currentProvider);
// import EthereumTx from 'ethereumjs-tx';

export default class MetamaskWallet {
  constructor(address) {
    this.address = address;
    this.type = 'Web3';
    this.getAddress = this.getAddress.bind(this);
    this.getAddressString = this.getAddressString.bind(this);
    this.signMessage = this._signMessage.bind(this);
    this.signTransaction = this._signTransaction.bind(this);
  }

  getAddress() {
    return this.address;
  }

  getAddressString() {
    return this.address;
  }

  _signMessage(message) {
    const address = this.address;
    const promise = web3.eth.personal.sign(message, address);
    return new Promise(function(resolve) {
      resolve(promise);
    });
  }

  // Kept name to keep it uniformed with the others
  _signTransaction(raw) {
    raw['from'] = this.address;

    return new Promise(function(resolve, reject) {
      web3.eth.sendTransaction(raw, function(err, res) {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
}