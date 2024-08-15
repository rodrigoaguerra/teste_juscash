import { useSelector as useStoreSelector } from 'react-redux';

/**
 * react-redux useSelector simplifier
 * @param {String} store The redux Store / State name
 */
export default function useReduxSelector(store) {
  return useStoreSelector((state) => state[store]);
}