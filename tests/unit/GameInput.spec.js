import { expect } from 'chai'
import sinon from 'sinon'
import { shallowMount } from '@vue/test-utils'
import GameInput from '@/components/GameInput.vue'

describe('GameInput.vue', () => {
  const $bus = {
    $emit () {},
    $on () {}
  }

  const $socket = {
    init () {}
  }

  let sandbox = {}

  beforeEach(() => {
    sandbox = sinon.createSandbox()
    sandbox.stub($bus)
    sandbox.stub($socket)
  })

  it('sets up listeners on bus', () => {
    const wrapper = shallowMount(GameInput, {mocks: { $bus, $socket }})
    expect(wrapper).to.be.ok
  })
})
