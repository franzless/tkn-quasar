import Vue from 'vue'

import './styles/quasar.styl'
import lang from 'quasar/lang/de.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/mdi-v3/mdi-v3.css'
import {
  Quasar, 
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QForm,
  QInput,
  QToggle
} from 'quasar'

Vue.use(Quasar, {
  
  config: {},
  components: {    
    QLayout,
    QForm,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QToggle,
    QInput
  },  
  directives: {
  },
  plugins: {
  },
  lang: lang
 })