import moment from 'moment'

export const fromNowFilter = {
  filters: {
    fromNow (datetime) {
      return datetime ? moment(datetime).fromNow() : '-'
    }
  }
}

export const emptyImageFilter = {
  filters: {
    emptyImage(src, size = '350x220', text = 'No+Image') {
      // size example '350x220' or '60x60' or '60'
      return src || `https://via.placeholder.com/${size}/DFDFDF?text=${text}`
    }
  }
}