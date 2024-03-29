<template>
  <div id="app">
    <div class="body">
      <p class="title">Bridge for Sepolia-Optimism and Sepolia-Base</p>
      <div class="metamask-connect-wrap">
        <button class="metamask-connect-btn" v-show="!metamaskConnected" @click="onWalletConnect">
          Connect metamask
        </button>
        <span class="current-account" v-show="metamaskConnected">
          {{ currentAccount }}
        </span>
      </div>
      <div class="bridge-input-wrap" v-show="metamaskIsInstalled">
        <span class="bridge-input-title">From Optimism to Base</span>
        <input type="text" v-model="bridgeSrcAmount" class="bridge-input"
          placeholder="Enter the amount you want to cross-chain.">
        <button class="bridge-confirm-btn btn" :disable="isLoading" @click="confirmSrcBridge">Confirm</button>
      </div>
      <div class="bridge-input-wrap" v-show="metamaskIsInstalled">
        <span class="bridge-input-title">From Base to Optimism</span>
        <input type="text" v-model="bridgeDstAmount" class="bridge-input"
          placeholder="Enter the amount you want to cross-chain.">
        <button class="bridge-confirm-btn btn" :disable="isLoading" @click="confirmDstBridge">Confirm</button>
      </div>
      <div class="loading-wrap" v-show="isLoading">
        Loading...
      </div>
      <div class="chain-wrap">
        <div class="chain-common-wrap">
          <span class="chain-balance">
            Optimism balance: {{ currentAccountOpBalance }} {{ srcTokenSymbol }}
          </span>
        </div>
        <div class="chain-line">--------></div>
        <div class="chain-common-wrap">

          <span class="chain-balance">
            Base balance: {{ currentAccountBaseBalance }} {{ dstTokenSymbol }}
          </span>
        </div>
      </div>
      <p v-show="!metamaskIsInstalled || !isOptimismNetwork">{{ alertMessage }}</p>
      <button disabled class="btn" @click="authSrc">Auth source(disabled)</button>
      <button disabled class="btn" @click="authDst" style="margin-top:20px;">Auth Destination(disabled)</button>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3';
import { opAbi, erc20Abi, baseAbi } from './abi/abi';
import BigNumber from "bignumber.js";
import { opTokenContract, baseTokenContract, opBridgeContract, baseBridgeContract } from './config';

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      alertMessage: 'Please install metamask first',
      account: null,
      metamaskIsInstalled: false,
      isOptimismNetwork: false,
      web3: null,
      metamaskConnected: false,
      currentAccount: '',
      currentAccountOpBalance: '',
      currentAccountBaseBalance: '',
      opWeb3: null,
      bridgeSrcAmount: '',
      bridgeDstAmount: '',
      isLoading: false,
      srcTokenSymbol:'',
      dstTokenSymbol:'',
    }
  },
  async mounted() {
    this.opWeb3 = new Web3('https://public.stackup.sh/api/v1/node/optimism-sepolia');
    this.baseWeb3 = new Web3('https://sepolia.base.org');
    if (typeof window.ethereum !== 'undefined') {
      this.metamaskIsInstalled = true;
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0xaa37dc' || chainId !== '0x14a34') {
        this.alertMessage = 'Switch or add Sepolia-Optimism network and Sepolia-Base fist'
      } else {
        this.isOptimismNetwork = true;
      }
      this.web3 = new Web3(window.ethereum);
      if (ethereum.isConnected()) {
        const accounts = await ethereum.request({ method: 'eth_accounts' })
        if (accounts && accounts.length > 0) {
          this.currentAccount = accounts[0];
          this.metamaskConnected = true;
          this.queryOpBalance();
          this.queryBaseBalance();
        }

      }
    } else {

      //alert('Please install MetaMask!');
    }


    this.addBridgeListener()
    this.addMWListener()
  },
  methods: {
    addBridgeListener() {
      const opWeb3 = new Web3('https://public.stackup.sh/api/v1/node/optimism-sepolia');
      const baseWeb3 = new Web3('https://sepolia.base.org');
      // base
      const baseContract = new baseWeb3.eth.Contract(baseAbi, '0x285731907369c4c30f5578018441Dc3079CEa243');

      baseContract.events.allEvents({
        fromBlock: 'latest'
      }, function (error, event) {
        if (error) console.error(error);
        console.log(event);
      });

      const opContract = new opWeb3.eth.Contract(opAbi, '0xc41f5f33D638762b6b823096CC573fdeaf9b1777');

      opContract.events.allEvents({
        fromBlock: 'latest'
      }, function (error, event) {
        if (error) console.error(error);
        console.log(event);
      });

    },
    async confirmSrcBridge() {
      console.log(this.bridgeSrcAmount)
      try {
        this.isLoading = true
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        if (chainId !== '0xaa37dc') {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa37dc' }], 
          });
        }
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable(); 
        const accounts = await web3.eth.getAccounts(); 
        const myAccount = accounts[0]; 
        const c = new web3.eth.Contract(opAbi, opBridgeContract);
        const channel = web3.utils.padRight(web3.utils.asciiToHex("channel-10"), 64);
        //console.log('channel', channel);
        const receipt = await c.methods.bridgeToDstChain(
          baseBridgeContract,
          channel,
          this._multiplyBy10Pow18(this.bridgeSrcAmount)
        ).send({ from: myAccount });

        setTimeout(()=> {
          this.isLoading = false;
          this.queryBaseBalance()
          this.queryOpBalance()
        }, 20000)

        console.log('send universal packet successful', receipt);
      } catch (error) {
        this.isLoading = false;
        console.error('send universal packet failed', error);
      }
    },

    async confirmDstBridge() {
      console.log(this.bridgeDstAmount)
      try {
        this.isLoading = true;
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        if (chainId !== '0x14a34') {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x14a34' }], 
          });
        }
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable(); 
        const accounts = await web3.eth.getAccounts(); 
        const myAccount = accounts[0]; 
        const c = new web3.eth.Contract(baseAbi, baseBridgeContract);
        const channel = web3.utils.padRight(web3.utils.asciiToHex("channel-11"), 64);
        //console.log('channel', channel);
        const receipt = await c.methods.bridgeToSrcChain(
          '0x4e228D691c5A5608EF05666924F9bC49a933D41F',
          channel,
          this._multiplyBy10Pow18(this.bridgeDstAmount)
        ).send({ from: myAccount });
        setTimeout(()=> {
          this.isLoading = false;
          this.queryBaseBalance()
          this.queryOpBalance()
        }, 20000)

        console.log('send universal packet successful', receipt);
      } catch (error) {
        this.isLoading = false
        console.error('send universal packet failed', error);
      }
    },

    _multiplyBy10Pow18(number) {
      const num = new BigNumber(number);
      const result = num.multipliedBy(new BigNumber(10).pow(18));
      return result.toNumber();
    },
    async addMWListener() {


    },
    async onWalletConnect() {
      try {
        await window.ethereum.enable();
        const accounts = await this.web3.eth.getAccounts();
        this.currentAccount = accounts[0];
        this.metamaskConnected = true;
        this.queryOpBalance();
        this.queryBaseBalance();
      } catch (error) {
        console.error('connect wallet failed', error);
      }

    },
    async callContractMethod() {

    },
    async authSrc() {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable(); 
        const accounts = await web3.eth.getAccounts(); 
        const myAccount = accounts[0]; 
        const c = new web3.eth.Contract(erc20Abi, opTokenContract);
        const receipt = await c.methods.changeManager(
          '0x4e228D691c5A5608EF05666924F9bC49a933D41F'
        ).send({ from: myAccount });
        console.log('auth src successful', receipt);
      } catch (error) {
        console.error('auth src contract failed', error);
      }
    },
    async authDst() {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable(); 
        const accounts = await web3.eth.getAccounts(); 
        const myAccount = accounts[0]; 
        const c = new web3.eth.Contract(erc20Abi, baseTokenContract);
        const receipt = await c.methods.changeManager(
          baseBridgeContract
        ).send({ from: myAccount });
        console.log('auth dst successful', receipt);
      } catch (error) {
        console.error('send dst contract failed', error);
      }
    },
    async queryOpBalance() {
      try {
        const c = new this.opWeb3.eth.Contract(erc20Abi, opTokenContract);
        const balance = await c.methods.balanceOf(
          this.currentAccount,
        ).call();
        const symbol = await c.methods.symbol().call();
        let bigNumber = new BigNumber(Number(balance));
        let result = bigNumber.dividedBy('1e18');
        this.currentAccountOpBalance = result
        this.srcTokenSymbol = symbol

        console.log(result.toString());
      } catch (error) {
        console.error('send universal packet failed', error);
      }
    },
    async queryBaseBalance() {
      try {
        const c = new this.baseWeb3.eth.Contract(erc20Abi, baseTokenContract);
        const balance = await c.methods.balanceOf(
          this.currentAccount,
        ).call();
        const symbol = await c.methods.symbol().call();
        let bigNumber = new BigNumber(Number(balance));
        let result = bigNumber.dividedBy('1e18');
        this.currentAccountBaseBalance = result
        this.dstTokenSymbol = symbol

        console.log(result.toString());
      } catch (error) {
        console.error('send universal packet failed', error);
      }
    }

  }

}
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #f0f0f0;
  width: 100%;
  height: 100%;

  .body {
    width: 100%;
    height: 100%;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .btn {
      background-color: #409eff;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      outline: none;
      transition: .3s;
      min-height: 28px;

      &:hover {
        background-color: #66b1ff;
      }
    }

    .title {
      font-size: 28px;

    }

    .metamask-connect-wrap {
      margin-bottom: 10px;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding-right: 40px;

      .metamask-connect-btn {
        padding: 3px 6px;

      }
    }

    .bridge-input-wrap {
      margin: 10px 0;
      display: flex;

      .bridge-input-title {}

      .bridge-input {
        width: 300px;
        height: 22px;
        margin: 0 20px;
      }

      .bridge-confirm-btn {}
    }

    .chain-wrap {
      display: flex;

      .chain-common-wrap {
        width: 300px;
        height: 40px;
        border: 1px solid yellowgreen;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .chain-line {
        display: flex;
        align-items: center;
        margin: 0 20px;
      }
    }


  }
}
</style>
