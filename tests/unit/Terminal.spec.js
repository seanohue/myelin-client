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
    sandbox.stub($socket)
    sandbox.stub($ansi)
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

  describe('outputting messages', () => {
    beforeEach(() => {
      $ansi.ansi_to_html.returnsArg(0)
    })
    it('should add a message to the messages list when method is called', () => {
      const wrapper = shallowMount(Terminal, {mocks: { $bus, $socket, $ansi }})

      const message = 'This is a test.'
      wrapper.vm.outputMessage(message)

      expect(wrapper.vm.messages).to.include(message)
    })

    it('should add a message to the messages list when method is called', () => {
      const wrapper = shallowMount(Terminal, {mocks: { $bus, $socket, $ansi }})

      const message = 'This is a test.'
      wrapper.vm.outputMessage(message)

      expect(wrapper.vm.messages).to.include(message)
    })

    it('should call to scroll', () => {
      const wrapper = shallowMount(Terminal, {mocks: { $bus, $socket, $ansi }})
      sandbox.spy(wrapper.vm, 'scrollDown')
      const message = 'This is a test.'
      wrapper.vm.outputMessage(message)

      expect(wrapper.vm.scrollDown.called).to.equal(true)
    })
  })
})
