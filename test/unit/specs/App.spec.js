import { mount } from 'vue-test-utils'
import App from '@/App'

describe('App.vue', () => {
  it('should tranform firebase config', () => {
    const firebaseConfig = `
      <script src="https://www.gstatic.com/firebasejs/4.8.1/firebase.js"></script>
      <script>
        // Initialize Firebase
        var config = {
          apiKey: "API_KEY_DEMO",
          authDomain: "AUTH_DOMAIN.FIREBASE.COM",
          databaseURL: "https://database-url.firebaseio.com",
          projectId: "project-id",
          storageBucket: "storgage-bucket.appspot.com",
          messagingSenderId: "MESSAGING_SENDER_ID"
        };
        firebase.initializeApp(config);
      </script>
    `
    const result = `apiKey="'API_KEY_DEMO'"
authDomain="'AUTH_DOMAIN.FIREBASE.COM'"
databaseURL="'https://database-url.firebaseio.com'"
projectId="'project-id'"
storageBucket="'storgage-bucket.appspot.com'"
messagingSenderId="'MESSAGING_SENDER_ID'"`

    const wrapper = mount(App, {
      data: {
        jsonConf: firebaseConfig
      }
    })
    wrapper.vm.transform()

    expect(wrapper.vm.result)
    .toEqual(result)
  })
})
