import deepFreeze from 'deep-freeze'
import _ from 'lodash'
import * as types from '../constants/ActionTypes'

const initialState = deepFreeze({
  activeFilters:   [ 'Bourbon', 'Irish', 'Rye', 'Scotch', 'Whisky' ],
  activeProfiles:  [ 'Floral', 'Fruity', 'Honey', 'Malty', 'Nutty', 'Smokey', 'Spicy', 'Sweet' ],
  activeSorter:    { direction: 'desc', sort: 'event_number', title: 'Recent events' },
  activeWhisky:    { },
  modalVisible:    false,
})

export default function(state = initialState, action) {
  switch (action.type) {

    case types.FETCH_WHISKIES: {
      const whiskies = [ ...action.payload.data ]

      whiskies.forEach(whisky => {
        whisky.ratings_count = whisky.ratings.length
      })

      return deepFreeze({
        ...state,
        whiskies,
      })
    }

    case types.FETCH_FILTERS: {
      const filters = [ ...action.payload.data ]

      return deepFreeze({
        ...state,
        filters,
      })
    }

    case types.FETCH_PROFILES: {
      const profiles = [ ...action.payload.data ]

      return deepFreeze({
        ...state,
        profiles,
      })
    }

    case types.FETCH_SORTERS: {
      const sorters = [ ...action.payload.data ]

      return deepFreeze({
        ...state,
        sorters,
      })
    }

    case types.UPDATE_ACTIVE_FILTERS: {
      const filter = action.payload
      let activeFilters = [ ...state.activeFilters ]

      if (state.activeFilters.includes(filter)) {
        activeFilters = _.pull(activeFilters, filter)
      }
      else {
        activeFilters.push(filter)
      }

      return deepFreeze({
        ...state,
        activeFilters,
      })
    }

    case types.UPDATE_ACTIVE_PROFILES: {
      const profile = action.payload
      let activeProfiles = [ ...state.activeProfiles ]

      if (state.activeProfiles.includes(profile)) {
        activeProfiles = _.pull(activeProfiles, profile)
      }
      else {
        activeProfiles.push(profile)
      }

      return deepFreeze({
        ...state,
        activeProfiles,
      })
    }

    case types.UPDATE_ACTIVE_SORTER: {
      const activeSorter = action.payload

      return deepFreeze({
        ...state,
        activeSorter,
      })
    }

    case types.OPEN_MODAL: {
      const activeWhisky = action.payload

      return deepFreeze({
        ...state,
        modalVisible: true,
        activeWhisky,
      })
    }

    case types.CLOSE_MODAL: {
      return deepFreeze({
        ...state,
        modalVisible: false,
      })
    }

    default: {
      return deepFreeze({
        ...state,
      })
    }
  }
}
