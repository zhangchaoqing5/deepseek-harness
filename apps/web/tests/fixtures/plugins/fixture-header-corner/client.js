window.__ModuleLoader__.load({
  id: '@fixture/header-corner',
  factory(require) {
    const React = require('react')
    const name = 'conversation.session.header.corner.actions'
    function SessionButton({ sessionId }) {
      const [clicked, setClicked] = React.useState(false)
      return React.createElement('button', { 'data-corner-session': sessionId, onClick: () => setClicked(true) },
        clicked ? sessionId : 'Inspect session')
    }
    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.slots.inject(name, () => ctx.slots.register({ name, id: 'inspect-session' }, SessionButton))
      },
    }
  },
})
