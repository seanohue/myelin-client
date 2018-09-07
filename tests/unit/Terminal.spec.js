import { expect } from 'chai'
import sinon from 'sinon'
import { shallowMount } from '@vue/test-utils'
import Terminal from '@/components/Terminal.vue'

describe('Terminal.vue', () => {
  const $bus = {
    $emit () {},
    $on () {}
  }

  let sandbox = {}

  beforeEach(() => {
    sandbox = sinon.createSandbox()
    sandbox.stub($bus)
  })

  it('sets up listeners on bus', () => {
    shallowMount(Terminal, {mocks: { $bus }})
    const events = [
      'connected',
      'disconnected',
      'error',
      'message'
    ]
    events.forEach(event => expect($bus.$on.calledWith(event)).to.be.true)
  })
})
