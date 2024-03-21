<template>
  <div id="app">
    <div class="body">
      <button class="btn" @click="callContractMethod"> click me </button>
      <p>{{ alertMessage }}</p>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3';
import { abi } from './abi/abi';

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      alertMessage: '',
      web3: null,
      account: null,
      metamaskIsInstalled: false
    }
  },
  mounted() {
    if (typeof window.ethereum !== 'undefined') {
      this.metamaskIsInstalled = true;
      this.alertMessage = 'please add/switch optimism-sepolia network'
    } else {
      alert('Please install MetaMask!');
    }
    this.web3 = new Web3('https://sepolia.optimism.io');
    //this.web3 = new Web3('https://base.optimism.io');
  },
  methods: {
    changeMessage() {
      this.message = 'Hello World!'
    },
    async callContractMethod() {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable(); // 请求用户授权
        const accounts = await web3.eth.getAccounts(); // 获取用户账户
        const myAccount = accounts[0]; // 使用第一个账户
        const c = new web3.eth.Contract(abi, '0xBd5B86B0a3d101c3aCD7292ce17C86fd1F8e8A17');
        const channel = web3.utils.padRight(web3.utils.asciiToHex("channel-10"), 64);
        //console.log('channel', channel);
        const receipt = await c.methods.bridgeToDstChain(
          '0x08bc67698340952Cf5cE9F92e6d9315E07762Ef6',
          channel,
          3000000000
        ).send({ from: myAccount });

        console.log('send universal packet successful', receipt);
        /* c.events.onRecvUniversalPacket({
          filter: { from: myAccount },
          fromBlock: 'latest'
        }, function (error, event) {
          if (error) {
            console.error('Error on event:', error);
          } else {
            console.log('Event:', event);
          }
        })
          .on('data', function (event) {
            console.log('Event data:', event); // 同样的事件对象也会被传递给回调函数
          })
          .on('changed', function (event) {
            // 当一个事件被移除时会触发，例如当一个交易被接受后又被区块链重组时
            console.log('changed', event);
          })
          .on('error', console.error); */
      } catch (error) {
        console.error('send universal packet failed', error);
      }


    }
  },
  created() {
    this.changeMessage()
  },
  computed: {
    reversedMessage() {
      return this.message.split('').reverse().join('')
    }
  },

}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  .body {
    background-color: #f0f0f0;
    padding: 20px;

    .btn {
      width: 100px;
      height: 40px;
      background-color: #409eff;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      outline: none;
      transition: .3s;

      &:hover {
        background-color: #66b1ff;
      }
    }
  }
}
</style>
