import Vue from 'vue'

import './styles/quasar.styl'
import lang from 'quasar/lang/de.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/mdi-v3/mdi-v3.css'
import {
  Quasar,
  Notify, 
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QPageSticky,
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
  QToggle,
  QFab,
  QFabAction,
  QTime,
  QPopupProxy,
  QDate,
  QDialog,
  QCard,
  QCardSection,
  QCardActions,
  QTimeline,
  QTimelineEntry
} from 'quasar'

Vue.use(Quasar, {
  
  config: {notify: { /* Notify defaults */ }},
  components: {    
    QLayout,
    QForm,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QPageSticky,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QToggle,
    QInput,
    QFab,
    QFabAction,
    QTime,
    QPopupProxy,
    QDate,
    QDialog,
    QCard,
    QCardActions,
    QCardSection,
    QTimeline,
    QTimelineEntry
  },  
  directives: {
  },
  plugins: {
    Notify  
  },
  lang: lang
 })