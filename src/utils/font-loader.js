import eventEmitter from './event-emitter'
import WebFont from 'webfontloader'
import { FONTS_LOADED } from '../constants'

WebFont.load({
  google: {
    families: ['Open Sans:400,600,700', 'Noto Sans:400,600,700']
  },
  active: () => {
    eventEmitter.emit(FONTS_LOADED)
  },
  timeout: 2000
})
