import eventEmitter from './event-emitter'
import { FONTS_LOADED } from '../constants'

if (typeof window !== `undefined`) {
  const WebFont = require('webfontloader')
  WebFont.load({
    google: {
      families: ['Open Sans:400,600,700', 'Noto Sans:400,600,700']
    },
    active: () => {
      eventEmitter.emit(FONTS_LOADED)
    },
    timeout: 2000
  })
}
