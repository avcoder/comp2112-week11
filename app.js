const app = new Vue({
  el: '#app',
  mounted() {
    this.p = new SimplePeer({
      initiator: window.location.hash === '#1',
      trickle: false
    });

    this.p.on('error', (err) => {
      console.log('error', err);
    });

    this.p.on('signal', (data) => {
      console.log('SIGNAL', JSON.stringify(data));
      document.querySelector('#outgoing').textContent = JSON.stringify(data);
    });

    document.querySelector('form').addEventListener('submit', (ev) => {
      ev.preventDefault();
      this.p.signal(JSON.parse(document.querySelector('#incoming').value));
    });

    this.p.on('connect', () => {
      console.log('CONNECTED');
    });

    this.p.on('data', (data) => {
      this.message = data;
    });
  },
  data: {
    message: 'Hello Vue!',
    p: null
  }
});
