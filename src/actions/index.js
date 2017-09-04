import axios from 'axios'
import * as types from '../constants/ActionTypes'
import * as urls from '../constants/DataSources'

export const fetchWhiskies = () => {
  const request = axios.get(urls.DATA_WHISKIES)

  return {
    type: types.FETCH_WHISKIES,
    payload: request,
  }
}

export const fetchFilters = () => {
  const request = axios.get(urls.DATA_FILTERS)

  return {
    type: types.FETCH_FILTERS,
    payload: request,
  }
}

export const fetchProfiles = () => {
  const request = axios.get(urls.DATA_PROFILES)

  return {
    type: types.FETCH_PROFILES,
    payload: request,
  }
}

export const fetchSorters = () => {
  const request = axios.get(urls.DATA_SORTERS)

  return {
    type: types.FETCH_SORTERS,
    payload: request,
  }
}

export const updateActiveFilters = (payload) => {
  return {
    type: types.UPDATE_ACTIVE_FILTERS,
    payload,
  }
}

export const updateActiveProfiles = (payload) => {
  return {
    type: types.UPDATE_ACTIVE_PROFILES,
    payload,
  }
}

export const updateActiveSorter = (payload) => {
  return {
    type: types.UPDATE_ACTIVE_SORTER,
    payload,
  }
}

export const openModal = (payload) => {
  return {
    type: types.OPEN_MODAL,
    payload,
  }
}

export const closeModal = (payload) => {
  return {
    type: types.CLOSE_MODAL,
    payload,
  }
}
