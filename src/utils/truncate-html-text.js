import eventEmitter from './event-emitter'
import shave from 'shave'
import { FONTS_LOADED } from '../constants'

export default class TruncateHtmlText {
  constructor(HTMLElement) {
    this.HTMLElement = HTMLElement
    this.savedText = ''
    this.onResizeWindow = this.onResizeWindow.bind(this)
    this.onLoadFonts = this.onLoadFonts.bind(this)
    this.initialize()
  }

  initialize() {
    this.saveText()
    this.truncateText()
    eventEmitter.on(FONTS_LOADED, this.onLoadFonts)
    window.addEventListener('resize', this.onResizeWindow)
  }

  saveText() {
    this.savedText = this.HTMLElement.innerHTML
  }

  truncateText() {
    const maxHeight = parseInt(getComputedStyle(this.HTMLElement).maxHeight)

    if (maxHeight)
      shave(this.HTMLElement, maxHeight)
    
  }

  onResizeWindow() {
    this.restoreSavedText()
    this.truncateText()
  }

  restoreSavedText() {
    this.HTMLElement.innerHTML = this.savedText
  }

  onLoadFonts() {
    this.restoreSavedText()
    this.truncateText()
  }

  destroy() {
    window.removeEventListener('resize', this.onResizeWindow)
    eventEmitter.off(FONTS_LOADED, this.onLoadFonts)
  }
}
