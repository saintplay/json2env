<template>
  <div id="app">
    <div class="container">
      <div class="columns">
        <div class="column is-5">
          <div class="field">
            <label class="label">JSON Config</label>
            <div class="control">
              <textarea class="textarea" rows="16" v-model="jsonConf"></textarea>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-link" @click="transform">Transform</button>
            </div>
          </div>
        </div>
        <div class="column is-offset-2 is-5">
          <div class="field">
            <label class="label">Result</label>
            <div class="control">
              <textarea id="result" class="textarea" rows="16" readonly :value="result"></textarea>
            </div>
          </div>
          <div v-if="result" class="field">
            <div class="control">
              <button id="copy-button" class="button is-link" data-clipboard-target="#result">Copy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard'

const KEY_VALUE_EXP = /\w+: ".+"/g

export default {
  name: 'app',
  data () {
    return {
      jsonConf: '',
      result: null
    }
  },
  mounted () {
    /* eslint-disable no-new */
    new Clipboard('#copy-button')
  },
  methods: {
    transform () {
      const keyValues = this.jsonConf.match(KEY_VALUE_EXP).map(kv => kv.split(': '))
      const keyValuesWithTrimmedQuotes = keyValues.map(kv => { return { key: kv[0], value: kv[1].replace(/"/g, '') } })
      const envsArray = keyValuesWithTrimmedQuotes.map(kv => `${kv.key}="'${kv.value}'"`)
      this.result = envsArray.join('\n')
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato');
@import "node_modules/bulma/bulma";

body {
  font-family: Lato, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

</style>

