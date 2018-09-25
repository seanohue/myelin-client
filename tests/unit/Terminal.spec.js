import { expect } from 'chai'
import sinon from 'sinon'
import { shallowMount } from '@vue/test-utils'
import Terminal from '@/components/Terminal.vue'

describe('Terminal.vue', () => {
  const $bus = {
    $emit () {},
    $on () {}
  }

  const $socket = {
    init () {}
  }

  const $ansi = {
    ansi_to_html () {}
  }

  let sandbox = {}

  beforeEach(() => {
    sandbox = sinon.createSandbox()
    sandbox.stub($bus)
  })

  it('sets up listeners on bus', () => {
    shallowMount(Terminal, {mocks: { $bus, $socket, $ansi }})
    const events = [
      'connected',
      'disconnected',
      'error',
      'message'
    ]
    events.forEach(event => expect($bus.$on.calledWith(event)).to.be.true)
  })
})
